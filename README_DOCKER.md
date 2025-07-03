# Dockerized IR Json Viewer

## Quick Start

1. **Build and run with Docker Compose:**
   ```sh
   docker-compose up --build -d
   ```
   This will build the image and start the app in the background, accessible at `http://<your-server-ip>:3000` from any device on your network or the internet (if your firewall/router allows).

2. **Auto-restart on system reboot:**
   - The `restart: always` policy in `docker-compose.yml` ensures the container starts on system boot and restarts if it crashes.
   - To enable Docker to start on boot (if not already):
     ```sh
     sudo systemctl enable docker
     ```

3. **Make your app public:**
   - Ensure port 3000 is open in your firewall and router.
   - For remote access, use your public IP or domain: `http://<your-public-ip>:3000`
   - For extra security, consider using HTTPS and a reverse proxy (e.g., Nginx, Caddy).

## Useful Commands
- View logs: `docker-compose logs -f`
- Stop: `docker-compose down`
- Rebuild: `docker-compose up --build -d`

## Security Note
- Exposing your app to the public internet is risky. Use strong passwords, HTTPS, and firewall rules as needed.
