import { server } from './_server.ts';

// create server instance
// (starting point)
//
// Flow:
// 1. Run server (_server.ts)
// 2. Use bootstrap module as a handler (_bootstrap.ts)
// 3. Start routing (_routing.ts)

server();