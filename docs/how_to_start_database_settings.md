## Database 세팅
Just-Game-server의 데이터베이스로는 Postgresql을 사용합니다.  
Postgresql을 위해 Docker를 사용합니다.  

### Docker 설치
Docker는 응용 프로그램들을 컨테이너 안에 배치시켜 자동화하는 프로젝트로 소프트웨어 실행에 필요한 모든 환경을 포함하여 파일 시스템으로 감싸 실행중인 환경과 상관 없이 항상 동일하게 실행되는 것을 보증해줍니다.  
Docker는 [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/)를 설치합니다.  

#### 설치 순서
1. apt package를 업데이트 합니다.
```bash
$ sudo apt-get update
```
2. apt가 https를 통해 저장소를 사용할 수 있도록 패키지를 설치합니다.
```bash
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```
3. Docker의 공식 GPG key를 추가합니다.  
GPG key는 공개키 암호화 방식으로 데이터를 전송 시 다른 사람이 변경하지 못하게 하는 용도로 사용됩니다.  
Docker의 개인키로 만들어진 프로그램을 공개키로 암호를 해제하여 Docker프로그램이 변경되지 않음을 확인합니다.  
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```  
GPG Key를 받았다면 아래의 명령어를 통해 key를 확인합니다.

```bash
$ sudo apt-key fingerprint 0EBFCD88

pub   4096R/0EBFCD88 2017-02-22
      Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid                  Docker Release (CE deb) <docker@docker.com>
sub   4096R/F273FCD8 2017-02-22
```
4. stable repository를 세팅합니다.
``` bash
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

5. apt package를 업데이트합니다.
```bash
$ sudo apt-get update
```

6. Docker CE의 최신버전을 설치합니다.
```bash
$ sudo apt-get install docker-ce
```

### Docker를 이용한 Postgresql 사용
Docker의 설치를 마쳤다면 Docker를 이용해 Postgresql을 실행합니다.  
먼저, docker image를 run하여 container를 생성하고 해당 container를 exec하여 실행합니다.  

```bash
$ docker run --name <container_name> -d postgres
// docker의 이미지를 통해 container를 생성

$ docker exec -it <container_name> psql -U <postgres_user_name>
// container를 exec명령어로 실행합니다.
// psql부터는 postgres 명령어 및 args를 입력할 수 있습니다.
// ex: docker exec -it <container_name> createdb serverdb -U postgres
```
이후에 docker container를 실행하고 싶다면 docker start 명령어를 사용해 실행시킵니다.  
```bash
$ docker start <container_name>
// container를 실행시킵니다.

$ docker exec -it <container_name> psql -U <postgres_user_name>
```
postgres 중 psql을 이용해 postgres shell에 들어가서 작업을 할 수 있습니다.  
혹은 createdb, dropdb, createuser와 같은 명령어를 통해 shell을 들어가지 않고 작업할 수도 있습니다.

#### Docker 명령어 정리
- run
    + Docker의 Image를 이용해 container를 새롭게 생성하는 명령어
    + Container를 생성하고 실행까지 한다.
    ```bash
    $ docker run --name <container_name> <docker_image>
    ```
- start
    + stop되어있는 container를 다시 running시키는 명령어
    ```bash
    $ docker start <container_name>
    ```
- exec
    + running중인 container를 실행하는 명령어
    ```bash
    $ docker exec -it <container_name>
    ```
- ps
    + container를 확인하는 명령어
    ```bash
    $ docker ps
    // 실행중인 container만 확인 가능
    $ docker ps -a
    // 모든 container 확인 가능
    ```
- cp
    + host와 container 사이에서 파일을 복사하는 명령어
    ```bash
    $ docker cp <host_file_path> <container_name>:<path>
    // host에서 container로 파일 전송
    $ docker cp <container_name>:<path> <host_file_path>
    // container에서 host로 파일 전송
    ```
- stop
    + 실행중인 container를 중지시키는 명령어
    ```bash
    $ docker stop <container_name>
    ```
- kill
    + 실행중인 container를 강제로 중지시키는 명령어
    ```bash
    $ docker kill <container_name>
    ```
- rm
    + container를 제거하는 명령어
    ```bash
    $ docker rm <container_name>
    ```
- rmi
    + Docker image를 제거하는 명령어
    ```bash
    $ docker rmi <container_name>
    ```


#### Docker Option 정리
Docker의 이미지를 run 혹은 exec할 때에 많은 옵션이 있습니다.  
그 중 Project에서 사용하는 Option들을 정리해두었습니다.  

- -d, --detach=false
    + Detached 모드, 데몬 모드라고도 부르며 컨테이너가 백그라운드로 실행되게 만듭니다.  
    + docker image를 백그라운드에서 run시키고 container 이름을 exec하여 사용합니다.
    ``` bash
    $ docker run -d <docker_image>
    // ex: docker run -d postgres
    // docker_image가 백그라운드로 돌게 됨
    ```
- -i, --interactive=false
    + 표준 입력(stdin)을 활성화하여 Bash에서의 명령 입력을 가능하게 합니다.
    + -i 옵션만으로는 화면 출력이 나오지 않아 단독으로 사용하지 않고 -it와 같이 -t옵션과 함께 사용합니다.
    ```bash
    $ docker run -i <docker_image>
    // ex: docker run -i postgres
    // 입력만 가능한 상태, 입력에 대한 결과만 출력으로 나옴
    // ex: docker run -it postgres
    // 입력, 출력 모두 가능한 상태, 주로 -it 로 사용
    ```
- --name=
    + 컨테이너에 이름을 설정합니다. 이후 이미지의 이름을 통해 실행합니다.
    + name을 지정하지 않으면 임의의 이름으로 container가 생성됩니다.
    ```bash
    $ docker run --name <container_name> <docker_image>
    // ex: docker run --name serverdb postgres
    // 이름을 설정하면 이후 container 이름을 통해 접근 가능합니다.
    ```
- -p, --publish=
    + 호스트에 연결된 컨테이너의 포트를 외부에 노출합니다.
    + 주로 web server의 port를 외부에 노출할 때에 사용합니다.
    ``` bash
    $ docker run -p <port> <docker_image>
    // ex: docker run -p 80 postgres
    // host의 포트는 무작위로 선정, container의 port만 지정

    $ docker run -p <host_port>:<container_port> <docker_image>
    // ex: docker run -p 80:80 postgres
    // host의 포트와 container의 port를 연결

    $ docker run -p <ip_address>:<host_port>:<container_port> <docker_image> 
    // ex: docker run -p 192.168.2.7:80:80
    // host ip 주소가 여러 개 일 경우, 연결을 위해 사용
    ```
- -t, --tty=false
    + TTY모드를 사용합니다. 화면의 출력을 가능하게 합니다.
    + bash 사용 시 입력을 가능하게 하는 -i와 함께 사용합니다.
    ```bash
    $ docker run -t <docker_image>
    // ex: docker run -t postgres
    // 화면 출력만 나오고 입력은 불가능한 상태
    // ex: docker run -it postgres
    // 입력, 출력 모두 가능한 상태, 주로 -it 로 사용
    ```

### Postgresql 사용
Docker를 이용해 Postgresql 세팅이 완료되었다면 이제 Postgres의 명령어를 사용해 DB를 구축할 수 있습니다.  
Docker에서 sql파일을 이용할 때에는 host에서 docker cp 명령어를 이용해 sql파일을 전송하여 사용합니다.  
Database는 기본 설정을 .sql 파일로 저장해두어 이 값을 copy해 Docker에 저장한 후 실행해 사용합니다.  
```bash
$ docker cp <sql_file_path> <container_name>:/home/basic.sql
$ docker exec -it <container_name> createdb <database_name> -U postgres
$ docker exec -it <container_name> psql <database_name> -U postgres

mydb=# \i /home/basic.sql
```

#### Postgresql 명령어
- \i <sql_file>
    + <sql_file_path>을 실행시켜 DB를 구축할 수 있습니다.
    ```bash
    $ docker exec -it <container_name> createdb mydb -U postgres
    $ docker exec -it <container_name> psql mydb -U postgres

    mydb=# \i basic.sql
    ```
- TABLE <table_name>
    + 특정 table의 상태를 확인할 수 있습니다.
    ``` bash
    mydb=# TABLE <table_name>
    // 해당 table의 attribute와 column을 확인 가능
    ```
- \dt
    + 현재 DATABASE에 만들어진 TABLE들을 확인할 수 있습니다.
    ``` bash
    mydb=# \dt
    // mydb DATABASE에 생성된 TABLE을 모두 확인 가능
    ```

- \l
    + 모든 DATABASE를 확인할 수 있습니다.
    ``` bash
    mydb=# \l
    // postgresql에 생성된 모든 DATABASE를 확인 가능
    ```


