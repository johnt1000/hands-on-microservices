#!/bin/sh
# wait-for-rabbit.sh

set -e

until curl http://rabbit:15672 -s | grep -q RabbitMQ; do
    >&2 echo "RabbitMQ is unavailable - sleeping"
    sleep 1
done

>&2 echo "RabbitMQ is up - executing command"
npm start