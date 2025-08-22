// Minimal static file server WITHOUT Express.
// Run: node server.js  -> open http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.json': 'application/json; charset=utf-8'
};

function send(res, status, body, headers = {}) {
	const base = { 'Content-Length': Buffer.byteLength(body) };
	res.writeHead(status, { ...base, ...headers });
	res.end(body);
}

function resolvePath(url) {
	try {
		const clean = decodeURIComponent(url.split('?')[0]);
		const rel = clean === '/' ? '/index.html' : clean;
		const full = path.join(ROOT, rel);
		if (!full.startsWith(ROOT)) return null; // prevent traversal
		return full;
	} catch {
		return null;
	}
}

const server = http.createServer((req, res) => {
	const filePath = resolvePath(req.url);
	if (!filePath) return send(res, 400, 'Bad Request');

	fs.stat(filePath, (err, stat) => {
		if (err) {
			// SPA fallback
			const indexPath = path.join(ROOT, 'index.html');
			return fs.readFile(indexPath, (e2, data) => {
				if (e2) return send(res, 404, 'Not Found');
				send(res, 200, data, { 'Content-Type': 'text/html; charset=utf-8' });
			});
		}
		if (stat.isDirectory()) {
			const idx = path.join(filePath, 'index.html');
			return fs.readFile(idx, (e3, data) => {
				if (e3) return send(res, 403, 'Forbidden');
				send(res, 200, data, { 'Content-Type': 'text/html; charset=utf-8' });
			});
		}
		fs.readFile(filePath, (e4, data) => {
			if (e4) return send(res, 500, 'Server Error');
			const ext = path.extname(filePath).toLowerCase();
			send(res, 200, data, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
		});
	});
});

server.listen(PORT, () => {
	console.log(`Local quiz running on http://localhost:${PORT}`);
});

