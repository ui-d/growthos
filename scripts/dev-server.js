#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');

async function getAvailablePort(startPort = 3000) {
  const checkPort = (port) => {
    return new Promise((resolve) => {
      const server = net.createServer();
      server.unref();
      server.on('error', () => resolve(false));
      server.listen(port, () => {
        server.close(() => resolve(true));
      });
    });
  };

  let port = startPort;
  let maxPort = startPort + 100; // Check up to 100 ports

  while (!(await checkPort(port)) && port < maxPort) {
    port++;
  }

  if (port >= maxPort) {
    throw new Error(`No available ports found between ${startPort} and ${maxPort}`);
  }

  return port;
}

function cleanupLockFiles() {
  const lockFile = path.join(process.cwd(), '.next', 'dev', 'lock');
  if (fs.existsSync(lockFile)) {
    console.log('Removing stale lock file...');
    try {
      fs.unlinkSync(lockFile);
    } catch (err) {
      console.warn('Could not remove lock file:', err.message);
    }
  }
}

function checkIfPortInUse(port) {
  try {
    execSync(`lsof -i :${port}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function startDevServer() {
  // Clean up any stale lock files first
  cleanupLockFiles();

  let port = 3000;

  // Check if default port is in use
  if (checkIfPortInUse(port)) {
    console.log(`Port ${port} is already in use, finding an available port...`);
    port = await getAvailablePort(port + 1);
  }

  console.log(`Starting development server on port ${port}...`);
  console.log(`URL: http://localhost:${port}`);

  const devServer = spawn('next', ['dev', '-p', port.toString()], {
    stdio: 'inherit',
    shell: true
  });

  // Handle cleanup on exit
  const cleanup = () => {
    cleanupLockFiles();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  devServer.on('error', (err) => {
    console.error('Failed to start dev server:', err);
    cleanupLockFiles();
    process.exit(1);
  });

  devServer.on('exit', (code) => {
    cleanupLockFiles();
    process.exit(code || 0);
  });
}

startDevServer();