app.module.ts는 루트 모듈, 각각의 모듈 안에는 컨트롤러, 엔티티, 서비스, 리포지토리 등으로 구성됩니다.

Controller란 ?
컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환합니다.

Handler란 ?
핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식된 컨트롤러 클래스 내의 단순한 메서드입니다.

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

Service란 ?
Service 안에서는 데이터베이스 관련된 로직을 처리합니다. 다시 말해, 데이터베이스에서 데이터를 가져오거나
데이터베이스안에 게시판을 생성할 때 생성한 게시판에 정보를 넣어주는 등의 로직을 처리합니다.

nest g service boards --no-spec
nest: using nestcli
g: generate
service: service schematic
boards: name of the schematic
--no-spec: 테스트를 위한 소스 코드 생성 x

CLI를 이용해서 Service를 생성하면 boards.service.ts 파일이 생성됩니다.
이 생성된 파일 안에는 injectable 데코레이터가 이 데코레이터를 이용하여 다른 컴포넌트에서
이 서비스를 사용할 수 있게(injectable) 만들어줍니다.

Board Service를 Board Controller에서 사용할 수 있게 해주기 위해서 Dependency Injection 설정을 합니다.
NestJS에서 Dependency Injection은 클래스의 Constructor안에서 이루어집니다.

@Controller('boards')
export class BoardsController {
boardsService: BoardsService;
constructor(boardsService: BoardsService) {
this.boardsService = boardsService;
}
}

1. boardsService 파라미터에 BoardsService 객체를 타입으로 지정해줍니다.
2. 이 boardsService 파라미터를 BoardsController 클래스 안에서 사용하기 위해서
   this.boardsService 프로퍼티에 boardsService 파라미터를 할당해줍니다.
3. 하지만 타입스크립트에서는 선언한 값만 객체의 프로퍼티로 사용가능하기 때문에 위에 boardsService:
   BoardsService로 선언해줍니다.
4. 이렇게 갖게된 boardsService 프로퍼티를 이용해서 BoardsController 클래스안에서 활용할 수 있습니다.

@Controller('boards')
export class BoardsController {
constructor(private boardsService: BoardsService)
}

접근 제한자를 이용해서 소스 간단하게 하기
접근제한자(public, protected, private)을 생성자(contructor) 파라미터에 선언하면 접근 제한자가
사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다.

Providers란 ?
프로바이더는 Nest의 기본 개념입니다. 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼 등
프로바이더로 취급될 수 있습니다. 프로바이더의 주요 아이디어는 종속성으로 주입할 수 있다는 것입니다. 즉,
객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에
위임될 수 있습니다.

Provider 등록하기
Provider를 사용하기 위해서는 module 파일에 providers 항목안에 해당 모듈에서 사용하고자 하는 Provider를 추가하면 됩니다.

Service란 ?
@Injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수 있습니다. 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을 처리합니다.

클라이언트에서 요청을 보내면 먼저 컨트롤러로 전달되고 컨트롤러에서 알맞은 요청 경로로 라우팅하여 해당 핸들러로 전달합니다. 그런 후에 요청을 처리하기 위해서 서비스로 이동하여 요청에 맞는 로직을 처리한 후 컨트롤러에 리턴값을 보내준 후 컨트롤러에서 클라이언트로 결과값을 보냅니다. 따라서 컨트롤러는 요청을 처리하고 결과값을 리턴해주는 역할을 합니다.

DTO(Data Transfer Object)는 무엇인가요 ?
계층간 데이터 교환을 위한 객체입니다. DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체를 말합니다. DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체입니다. interface나 class를 이용해서 정의될 수 있습니다. (하지만 클래스를 이용하는 것을 추천합니다.)

DTO(Data Transfer Object)를 쓰는 이유는 무엇인가요 ?

- 데이터 유효성을 체크하는데 효율적입니다.
- 더 안정적인 코드를 만들어 줍니다. 타입스크립트의 타입으로도 사용됩니다.

클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용합니다. 그래서 클래스를 사용해서 DTO를 작성합니다.
