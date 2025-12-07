#!/usr/bin/env bash

###############################################################################
# Visual Regression Baseline Update Script
#
# This script automates the process of updating visual regression test baselines
# ensuring consistency between local development and CI environments.
#
# Usage:
#   ./scripts/update-visual-baselines.sh [options]
#
# Options:
#   --docker          Update baselines using Docker (matches CI exactly)
#   --local           Update baselines locally (faster, may have slight diffs)
#   --test <pattern>  Only update baselines for tests matching pattern
#   --help            Show this help message
#
# Examples:
#   ./scripts/update-visual-baselines.sh --docker
#   ./scripts/update-visual-baselines.sh --local --test homepage
#   ./scripts/update-visual-baselines.sh --docker --test "visual/labs"
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
USE_DOCKER=false
TEST_PATTERN=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --docker)
      USE_DOCKER=true
      shift
      ;;
    --local)
      USE_DOCKER=false
      shift
      ;;
    --test)
      TEST_PATTERN="$2"
      shift 2
      ;;
    --help)
      head -n 25 "$0" | tail -n 20
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Function to print colored messages
print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

# Function to check prerequisites
check_prerequisites() {
  print_info "Checking prerequisites..."
  
  if [ "$USE_DOCKER" = true ]; then
    if ! command -v docker &> /dev/null; then
      print_error "Docker is not installed or not in PATH"
      exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
      print_error "docker-compose is not installed or not in PATH"
      exit 1
    fi
    
    print_success "Docker environment ready"
  else
    if ! command -v npm &> /dev/null; then
      print_error "npm is not installed or not in PATH"
      exit 1
    fi
    
    if [ ! -d "node_modules/@playwright" ]; then
      print_warning "Playwright not installed, installing now..."
      npm ci
    fi
    
    print_success "Local environment ready"
  fi
}

# Function to backup existing snapshots
backup_snapshots() {
  print_info "Backing up existing snapshots..."
  
  BACKUP_DIR="tests/.snapshots-backup-$(date +%Y%m%d-%H%M%S)"
  
  if find tests -name "*-snapshots" -type d | grep -q .; then
    mkdir -p "$BACKUP_DIR"
    find tests -name "*-snapshots" -type d -exec cp -r {} "$BACKUP_DIR/" \;
    print_success "Snapshots backed up to $BACKUP_DIR"
    echo "$BACKUP_DIR"
  else
    print_warning "No existing snapshots found to backup"
    echo ""
  fi
}

# Function to update baselines in Docker
update_baselines_docker() {
  print_info "Updating baselines in Docker (matches CI environment)..."
  
  # Build the Docker image first
  print_info "Building Docker image..."
  docker-compose -f docker-compose.test.yml build
  
  # Construct the test command
  local test_cmd="npx playwright test"
  if [ -n "$TEST_PATTERN" ]; then
    test_cmd="$test_cmd $TEST_PATTERN"
  fi
  test_cmd="$test_cmd --update-snapshots --project=chromium-desktop"
  
  print_info "Running: $test_cmd"
  
  # Run tests with snapshot update flag
  docker-compose -f docker-compose.test.yml run --rm playwright bash -c "$test_cmd"
  
  print_success "Docker baseline update complete"
}

# Function to update baselines locally
update_baselines_local() {
  print_info "Updating baselines locally..."
  
  # Build the application first
  print_info "Building application..."
  npm run build
  
  # Construct the test command
  local test_cmd="npx playwright test"
  if [ -n "$TEST_PATTERN" ]; then
    test_cmd="$test_cmd $TEST_PATTERN"
  fi
  test_cmd="$test_cmd --update-snapshots --project=chromium-desktop"
  
  print_info "Running: $test_cmd"
  
  # Run tests with snapshot update flag
  eval "$test_cmd"
  
  print_success "Local baseline update complete"
}

# Function to display summary
display_summary() {
  print_info "Scanning for updated snapshots..."
  
  local snapshot_count=$(find tests -name "*.png" -path "*-snapshots/*" -print0 | xargs -0 -I{} echo | wc -l)
  
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "  Visual Baseline Update Summary"
  echo "═══════════════════════════════════════════════════════════"
  echo ""
  echo "  Method:     $([ "$USE_DOCKER" = true ] && echo "Docker (CI-matched)" || echo "Local")"
  echo "  Snapshots:  $snapshot_count files"
  echo "  Backup:     $1"
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo ""
  
  print_warning "Next steps:"
  echo "  1. Review the updated snapshots in tests/*-snapshots/"
  echo "  2. Verify changes look correct"
  echo "  3. Commit the updated baseline images"
  echo "  4. If issues occur, restore from backup: $1"
  echo ""
}

# Function to verify snapshots
verify_snapshots() {
  print_info "Verifying snapshots..."
  
  local snapshot_dirs=$(find tests -name "*-snapshots" -type d)
  
  if [ -z "$snapshot_dirs" ]; then
    print_error "No snapshot directories found!"
    exit 1
  fi
  
  local has_snapshots=false
  while IFS= read -r dir; do
    if [ -n "$(ls -A "$dir" 2>/dev/null)" ]; then
      has_snapshots=true
      break
    fi
  done <<< "$snapshot_dirs"
  
  if [ "$has_snapshots" = false ]; then
    print_error "Snapshot directories exist but contain no files!"
    exit 1
  fi
  
  print_success "Snapshots verified"
}

# Main execution
main() {
  echo ""
  echo "═══════════════════════════════════════════════════════════"
  echo "  Visual Regression Baseline Update"
  echo "═══════════════════════════════════════════════════════════"
  echo ""
  
  if [ "$USE_DOCKER" = true ]; then
    print_info "Mode: Docker (CI-matched baselines)"
  else
    print_info "Mode: Local (faster, may have minor differences)"
  fi
  
  if [ -n "$TEST_PATTERN" ]; then
    print_info "Pattern: $TEST_PATTERN"
  else
    print_info "Pattern: All tests"
  fi
  
  echo ""
  
  # Check prerequisites
  check_prerequisites
  
  # Backup existing snapshots
  backup_dir=$(backup_snapshots)
  
  # Update baselines
  if [ "$USE_DOCKER" = true ]; then
    update_baselines_docker
  else
    update_baselines_local
  fi
  
  # Verify snapshots were created
  verify_snapshots
  
  # Display summary
  display_summary "$backup_dir"
  
  print_success "Baseline update completed successfully! 🎉"
}

# Run main function
main
