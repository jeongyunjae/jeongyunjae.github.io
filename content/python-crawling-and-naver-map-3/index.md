---
emoji: 🗺
title: 네이버지도로 지도 서비스 만들기 - 3탄
date: '2022-06-12 16:10'
author: 윤로그
tags: 블로그 github-pages gatsby
categories: 지도서비스
---

<h3>
안녕하세요 :)
<br />
<br />
이번 포스팅에서는 Selenium 라이브러리를 이용해서 지도에 검색어를 입력하고, 검색결과 데이터를 추출하는 과정을 담아보았습니다.
</h3>

<br />

## 1. 크롤링 시나리오

1. 크롬 브라우저를 열어 [네이버 지도](https://map.naver.com/v5/) 으로 이동한다.
2. 장소 검색에 "연세대학교 맛집"을 검색한다.
3. 검색된 매장리스트에서 매장별 정보(ex. 매장명, 주소 등)를 추출하여 csv파일에 저장한다.
4. 현재 페이지에 있는 매장별 정보를 전부 얻었다면 다음페이지로 이동한다.
5. 다음 페이지가 존재하지 않으면 크롤링을 종료하며, 브라우저를 닫는다.

<br />

## 2. 프로젝트 구조

```bash
├── src
│   ├── list.csv
│   ├── naver_crawl.py
│
├── app.py
└── requirements.txt
```

<br />

- list.csv: 크롤링된 매장정보를 저장할 파일
- naver_crawl.py: 크롤링에 필요한 모듈들을 정의한 파일
- app.py: 앱의 시작점
- requirements.txt: 프로젝트에 사용되는 라이브러리를 한 곳에 작성해둔 파일

<br />

## 3. 함수 기능 설명

`naver_crawl.py`에 크롤링에 필요한 여러 모듈들이 정의되어 있습니다. 해당 파일에는 크롤링에 이용되는 여러 함수들이 선언되어 있으며 하나하나 뜯어봅시다.
<br />

### get_driver (크롬브라우저 실행)

```python
# module import
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

def get_driver():
  options = webdriver.ChromeOptions()

  # 지정한 user-agent로 설정
  options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)
  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664 Safari/537.36")

  # 크롬 화면 크기를 설정(but 반응형 사이트에서는 html요소가 달라질 수 있음)
  options.add_argument("window-size=1440x900")

  # 브라우저가 백그라운드에서 실행되며, 보통 로컬환경에서는 크롤링 진행과정을 보면서 개발하는게 좋기 때문에 주석처리합니다.
  options.add_argument("headless")

  # ChromeDriverManager를 통해 현재 OS에 설치된 크롬브라우저 버전을 다운로드하고, 설정한 옵션을 적용합니다.
  driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)

  # 네이버 지도로 이동
  driver.get('https://map.naver.com')

  # 네이버 지도로 이동될 때까지 기다리는 최대 시간(초 단위)
  driver.implicitly_wait(60)
  return driver
```

<br />

### 장소 검색 함수(search_place)

```python
# @param driver: 생성했던 driver
# @param search_text: 검색할 키워드

def search_place(driver:WebDriver, search_text: str):
  # 검색창 element 선택
  search_input_box = driver.find_element_by_css_selector("div.input_box>input.input_search")

  # 선택한 검색창에 검색할 키워드 입력
  search_input_box.send_keys(search_text)

  # 엔터키 이벤트
  search_input_box.send_keys(Keys.ENTER)

  # 검색에 걸리는 시간보다 조금 더 넉넉하게 정지
  time.sleep(5)
```

<br />

### 페이지 이동 및 마지막 페이지 체크 함수(next_page_move)

```python
# @param driver: 생성했던 driver

def next_page_move(driver:WebDriver):
  # 페이지네이션 영역에 마지막 버튼 element 선택
  next_page_btn = driver.find_element_by_css_selector('div._2ky45>a:last-child')

  # 선택한 element을 html로 파싱하여 문자열 텍스트 가져올 준비
  next_page_class_name = BeautifulSoup(next_page_btn.get_attribute('class'), "html.parser")

  # 현재 페이지가 마지막 페이지일때, class의 이름이 달라짐을 이용한 조건문
  if len(next_page_class_name.text) > 10:
    print("검색완료")

    # 웹 드라이버 종료
    driver.quit()
    return False
  else:
    # 다음페이지 이동버튼 클릭
    next_page_btn.send_keys(Keys.ENTER)
    return True
```

<br />

`if len(next_page_class_name.text) > 10:`이 조건문 같은 경우, 조건에 사용되는 class의 길이는 언제든지 달라질 수 있어
바꿔줘야할 수도 있습니다.

### 검색결과 iframe 이동 함수(to_search_iframe)

```python
# @param driver: 생성했던 driver

def to_search_iframe(driver:WebDriver):
  driver.switch_to.default_content()
  driver.switch_to.frame('searchIframe')
```

<br />

[이전 포스팅](https://yunjaaae.com/python-crawling-and-naver-map-2/#iframe%EA%B0%84-%EC%9D%B4%EB%8F%99)에서 설명했듯이, 한 화면에 여러 Iframe이 있어 html 태그 선택을 넘나들기 위해, `driver.switch_to.default_content()`로 기본 Iframe 이동 후, 검색결과 Iframe의 id안 'searchIframe'를 argument로 하는 `driver.switch_to.frame('searchIframe')`를 실행시켜
<br />
Iframe 전환을 진행합니다.

### selector element를 텍스트로 변환 하는 함수(get_element_to_text)

```python
# @param element: <class "str">
# @return str

def get_element_to_text(element):
  return BeautifulSoup(element, "html.parser").get_text()
```

<br />

### get_store_data 함수 (매장정보 추출)

```python

# @param driver: 생성했던 driver
# @paramscroll_container: 검색결과 스크롤 영역
# @param file: 저장할 파일

def get_store_data(driver:WebDriver, scroll_container: WebElement, file: TextIOWrapper):

  # 검색결과 목록 li element들을 선택
  get_store_li = scroll_container.find_elements_by_css_selector('ul > li')

  # 현재 페이지에 존재하는 매장목록만큼 반복
  for index in range(len(get_store_li)):
    selectorArgument = 'div:nth-of-type(1) > a'
    wrapper_html = get_store_li[index].get_attribute('innerHTML')
    wrapper_soup = BeautifulSoup(wrapper_html, "html.parser")

    # 매장 항목 클릭
    get_store_li[index].find_element_by_css_selector(selectorArgument).click()

    # 매장 Iframe으로 이동
    driver.switch_to.default_content()
    driver.switch_to.frame('entryIframe')

    #로딩 시간 적용
    time.sleep(1)

    try:
      try:
        # 상세정보 페이지가 완전히 로딩될때까지 기다림
        WebDriverWait(driver,5).until(EC.presence_of_element_located((By.CLASS_NAME, "place_didmount")))
      except TimeoutException:
        to_search_iframe(driver)

      # 매장명 element 추출
      store_name = driver.find_element_by_css_selector('#_title > span:nth-child(1)').get_attribute('innerHTML')

      # 네이버 카테고리 element 추출
      if driver.find_element_by_css_selector('#_title > span._3ocDE').is_displayed():
        naver_category = driver.find_element_by_css_selector('#_title > span._3ocDE').get_attribute('innerHTML')
      else:
        naver_category = ''

      # 매장주소 element 추출
      address = driver.find_element_by_css_selector('.place_section_content > ul ._2yqUQ').get_attribute('innerHTML')

      # driver로 선택한 element를 텍스트로 변환
      store_name = get_element_to_text(store_name)
      address = get_element_to_text(address)
      naver_category = get_element_to_text(naver_category)

      # csv파일에 매장정보 저장
      file.write(store_name + "|" + address + "|" + naver_category + "\n")
      to_search_iframe(driver)
    except TimeoutException:
      to_search_iframe(driver)

```

<br />

### naver_crawl 함수 (메인 실행 함수)

```python
def naver_crawl():
  # 매장정보를 저장할 파일 오픈
  list_file = open('src/list.csv','a',encoding='utf-8')

  # 웹 드라이버
  driver = get_driver()

  # 장소 검색
  search_place(driver,'연세대학교 맛집')

  # 검색결과 Iframe으로 이동
  to_search_iframe(driver)

  time.sleep(2)

  try:
    # 검색결과목록 스크롤 element 선택
    scroll_container = driver.find_element_by_id("_pcmap_list_scroll_container")
  except:
    print("스크롤 영역 감지 실패")

  try:
    while True:
      for i in range(6):
        # 스크롤을 내리는 자바스크립트 코드 실행
        driver.execute_script("arguments[0].scrollBy(0,2000)",scroll_container)
        time.sleep(0.5)

      # 매장정보 저장
      get_store_data(driver,scroll_container,list_file)

      # 다음페이지가 있는지 확인 여부
      is_continue = next_page_move(driver)
      if is_continue == False:
        break
  except:
    print("크롤링 과정 중 에러 발생")
```

<br />

네이버 지도같은 경우, 여타 유명한 지도(ex. 카카오맵)와 다르게 스크롤 시, 데이터 렌더링이 적용되어 있기 때문에 스크롤을 맨 하단으로 이동시켜야지 요소 접근에 문제가 생기지 않습니다. 위 코드에서는 반복문을 사용하여 총 6번 스크롤을 실행시켰는데,
반복문 횟수는 직접 적용해가면서 최적화 시키는 것을 추천드립니다.

<br />

## 4. 결과물

### list.csv

```
store_name|address|naver_category
티아레나|서울 서대문구 연희맛로 43-2|홍차전문점
에스크투데이|서울 서대문구 연희로11가길 56 2층|카페,디저트
카멜로연남|서울 마포구 연희로1길 57 1.5층|양식
치플레|서울 마포구 동교로 262-9 1층|베이커리
공복식당|서울 서대문구 연세로12길 23 1층|돼지고기구이
정육면체|서울 서대문구 연세로5다길 22-8 1층 정육면체|아시아음식
카라멘야|서울 서대문구 연세로7안길 34-1 1층|일본식라면
앤티크커피|서울 마포구 연희로 25-1 1층 앤티크커피|카페,디저트
```

<br />

## 5. 다음 포스팅 미리보기

다음 포스팅에서는 저장된 매장정보에서 주소를 naver geolocation기능을 사용해 위도 경도를 반환하는 과정과,
현재 저장된 형태인 csv파일 형태에서 실제 db의 테이블로 저장하는 과정을 담아보겠습니다
감사합니다

### 자세한 코드는 [여기](https://github.com/jeongyunjae/yonsei-univ-matjip/tree/master/backend-crawling)에

```toc

```
