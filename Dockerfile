FROM oven/bun:1.1.8-slim

WORKDIR /home/bun/app

COPY ./ /home/bun/app

RUN bun install
CMD ["/home/bun/app/start.sh"]
