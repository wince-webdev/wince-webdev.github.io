import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';


const SERVER_PORT = 3000;


const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;


const LIVE_URL = "https://wince-webdev/.github.io";

const SCRIPT = process.env.npm_lifescycle_script ||"";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;

if (isBuild) {
    BASE_URL = LIVE_URL;
}

// https://astro.build/config
export default defineConfig({
    SERVER: { port: SERVER_PORT },
    site: BASE_URL,
    integrations: [
        sitemap(),
        tailwind({
            config: { applyBaseSttles: false },
        }),
    ]
});


