#!/bin/sh

# 이동할 디렉토리를 설정합니다.
cd ../

# output 디렉토리를 생성합니다.
mkdir -p output

# frontend-server 디렉토리의 모든 파일을 output 디렉토리로 복사합니다.
cp -R ./frontend-server/* ./output
