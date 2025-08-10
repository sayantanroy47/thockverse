# Thockverse Scripts & Tools

This directory contains utility scripts and development tools for managing the Thockverse project.

## Available Tools

### `/content-tools/`
- **extract-reviews.js** - Utility for processing and extracting switch review data

## Usage Guidelines

### Content Tools
Scripts in the `content-tools/` directory are designed to help with:
- Content processing and validation
- Data extraction and transformation  
- Batch operations on markdown files
- Content migration utilities

### Running Scripts
Most scripts should be run from the project root directory:

```bash
# Example usage
node scripts/content-tools/extract-reviews.js
```

### Development Tools
Additional development utilities can be added here following the same organizational pattern:
- Keep scripts in topic-specific subdirectories
- Include proper documentation in each script
- Add new tools to this README when created

## Contributing
When adding new scripts:
1. Place in appropriate subdirectory
2. Include clear usage instructions
3. Update this README file
4. Test thoroughly before committing