nest g controller boards
nest: using nestcli
g: generate
controller: controller schematic
boards: name of the schematic
--no-spec: 테스트를 위한 소스 코드 생성 x

<nest g controller boards --no-spec>
CLI로 명령어 입력 시 Controller 만드는 순서

1. cli는 먼저 boards라는 폴더 찾기
2. boards 폴더 안에 controller 파일 생성
3. boards 폴더 안에 module 파일 찾기
4. module 파일 안에 controller 추가
