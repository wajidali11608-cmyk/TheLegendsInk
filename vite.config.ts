import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function magzineCmsPlugin(): Plugin {
  return {
    name: 'magzine-cms-api',
    configureServer(server) {
      server.middlewares.use('/api/cms/publish', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const { issue, pdfBase64, fileName } = data;

            if (!issue || !issue.id) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid issue payload' }));
              return;
            }

            const publicDir = path.resolve(process.cwd(), 'public');
            const issuesDir = path.join(publicDir, 'issues');
            if (!fs.existsSync(issuesDir)) {
              fs.mkdirSync(issuesDir, { recursive: true });
            }

            // 1. Write active-issue.json
            fs.writeFileSync(
              path.join(issuesDir, 'active-issue.json'),
              JSON.stringify(issue, null, 2),
              'utf-8'
            );

            // 2. Read and update issues-feed.json
            const feedPath = path.join(issuesDir, 'issues-feed.json');
            let feed: any[] = [];
            if (fs.existsSync(feedPath)) {
              try {
                feed = JSON.parse(fs.readFileSync(feedPath, 'utf-8'));
              } catch (e) {
                feed = [];
              }
            }

            // Replace or prepend issue
            const filteredFeed = feed.filter((item: any) => item.id !== issue.id);
            const updatedFeed = [issue, ...filteredFeed];
            fs.writeFileSync(feedPath, JSON.stringify(updatedFeed, null, 2), 'utf-8');

            // 3. If PDF binary was sent
            if (pdfBase64 && fileName) {
              const targetPdfPath = path.join(publicDir, fileName);
              const pdfBuffer = Buffer.from(pdfBase64, 'base64');
              fs.writeFileSync(targetPdfPath, pdfBuffer);
              fs.writeFileSync(path.join(issuesDir, fileName), pdfBuffer);
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              message: `Issue "${issue.title}" successfully written to project files (active-issue.json & issues-feed.json)! Visible to all visitors permanently.`,
              issueId: issue.id,
            }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message || 'Server error saving issue' }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    magzineCmsPlugin()
  ],
  server: {
    port: 5173,
    host: true
  }
});
