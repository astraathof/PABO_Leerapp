/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack: (config) => {
    // Fix for canvas module in serverless environments
    config.resolve.alias.canvas = false;
    
    // Additional fixes for PDF.js in serverless
    config.resolve.alias['pdfjs-dist/build/pdf.worker.js'] = false;
    
    return config;
  }
}

module.exports = nextConfig