default:
	@echo check make targets for individual examples from https://deno.land/std/examples

welcome:
	deno run https://deno.land/std/examples/welcome.ts

curl:
	deno run --allow-net https://deno.land/std/examples/curl.ts https://httpbin.org/get?deno=rules

cat:
	deno run --allow-read https://deno.land/std/examples/cat.ts Makefile

colors:
	deno run https://deno.land/std/examples/colors.ts

chat:
	open http://localhost:8080; sleep 1
	deno run --allow-net --allow-read https://deno.land/std/examples/chat/server.ts

