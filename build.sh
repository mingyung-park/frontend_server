#!/bin/sh

# 이동할 디렉토리를 설정합니다.
cd ../
mkdir output
cp -R ./frontend_server/* ./output
cp -R ./output ./frontend_server/
