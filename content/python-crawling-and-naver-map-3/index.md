---
emoji: πΊ
title: λ€μ΄λ²μ§λλ‘ μ§λ μλΉμ€ λ§λ€κΈ° - 3ν
date: '2022-06-12 16:10'
author: μ€λ‘κ·Έ
tags: λΈλ‘κ·Έ github-pages gatsby
categories: μ§λμλΉμ€
---

<h3>
μλνμΈμ :)
<br />
<br />
μ΄λ² ν¬μ€νμμλ Selenium λΌμ΄λΈλ¬λ¦¬λ₯Ό μ΄μ©ν΄μ μ§λμ κ²μμ΄λ₯Ό μλ ₯νκ³ , κ²μκ²°κ³Ό λ°μ΄ν°λ₯Ό μΆμΆνλ κ³Όμ μ λ΄μλ³΄μμ΅λλ€.
</h3>

<br />

## 1. ν¬λ‘€λ§ μλλ¦¬μ€

1. ν¬λ‘¬ λΈλΌμ°μ λ₯Ό μ΄μ΄ [λ€μ΄λ² μ§λ](https://map.naver.com/v5/) μΌλ‘ μ΄λνλ€.
2. μ₯μ κ²μμ "μ°μΈλνκ΅ λ§μ§"μ κ²μνλ€.
3. κ²μλ λ§€μ₯λ¦¬μ€νΈμμ λ§€μ₯λ³ μ λ³΄(ex. λ§€μ₯λͺ, μ£Όμ λ±)λ₯Ό μΆμΆνμ¬ csvνμΌμ μ μ₯νλ€.
4. νμ¬ νμ΄μ§μ μλ λ§€μ₯λ³ μ λ³΄λ₯Ό μ λΆ μ»μλ€λ©΄ λ€μνμ΄μ§λ‘ μ΄λνλ€.
5. λ€μ νμ΄μ§κ° μ‘΄μ¬νμ§ μμΌλ©΄ ν¬λ‘€λ§μ μ’λ£νλ©°, λΈλΌμ°μ λ₯Ό λ«λλ€.

<br />

## 2. νλ‘μ νΈ κ΅¬μ‘°

```bash
βββ src
β   βββ list.csv
β   βββ naver_crawl.py
β
βββ app.py
βββ requirements.txt
```

<br />

- list.csv: ν¬λ‘€λ§λ λ§€μ₯μ λ³΄λ₯Ό μ μ₯ν  νμΌ
- naver_crawl.py: ν¬λ‘€λ§μ νμν λͺ¨λλ€μ μ μν νμΌ
- app.py: μ±μ μμμ 
- requirements.txt: νλ‘μ νΈμ μ¬μ©λλ λΌμ΄λΈλ¬λ¦¬λ₯Ό ν κ³³μ μμ±ν΄λ νμΌ

<br />

## 3. ν¨μ κΈ°λ₯ μ€λͺ

`naver_crawl.py`μ ν¬λ‘€λ§μ νμν μ¬λ¬ λͺ¨λλ€μ΄ μ μλμ΄ μμ΅λλ€. ν΄λΉ νμΌμλ ν¬λ‘€λ§μ μ΄μ©λλ μ¬λ¬ ν¨μλ€μ΄ μ μΈλμ΄ μμΌλ©° νλνλ λ―μ΄λ΄μλ€.
<br />

### get_driver (ν¬λ‘¬λΈλΌμ°μ  μ€ν)

```python
# module import
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

def get_driver():
  options = webdriver.ChromeOptions()

  # μ§μ ν user-agentλ‘ μ€μ 
  options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)
  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664 Safari/537.36")

  # ν¬λ‘¬ νλ©΄ ν¬κΈ°λ₯Ό μ€μ (but λ°μν μ¬μ΄νΈμμλ htmlμμκ° λ¬λΌμ§ μ μμ)
  options.add_argument("window-size=1440x900")

  # λΈλΌμ°μ κ° λ°±κ·ΈλΌμ΄λμμ μ€νλλ©°, λ³΄ν΅ λ‘μ»¬νκ²½μμλ ν¬λ‘€λ§ μ§νκ³Όμ μ λ³΄λ©΄μ κ°λ°νλκ² μ’κΈ° λλ¬Έμ μ£Όμμ²λ¦¬ν©λλ€.
  options.add_argument("headless")

  # ChromeDriverManagerλ₯Ό ν΅ν΄ νμ¬ OSμ μ€μΉλ ν¬λ‘¬λΈλΌμ°μ  λ²μ μ λ€μ΄λ‘λνκ³ , μ€μ ν μ΅μμ μ μ©ν©λλ€.
  driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)

  # λ€μ΄λ² μ§λλ‘ μ΄λ
  driver.get('https://map.naver.com')

  # λ€μ΄λ² μ§λλ‘ μ΄λλ  λκΉμ§ κΈ°λ€λ¦¬λ μ΅λ μκ°(μ΄ λ¨μ)
  driver.implicitly_wait(60)
  return driver
```

<br />

### μ₯μ κ²μ ν¨μ(search_place)

```python
# @param driver: μμ±νλ driver
# @param search_text: κ²μν  ν€μλ

def search_place(driver:WebDriver, search_text: str):
  # κ²μμ°½ element μ ν
  search_input_box = driver.find_element_by_css_selector("div.input_box>input.input_search")

  # μ νν κ²μμ°½μ κ²μν  ν€μλ μλ ₯
  search_input_box.send_keys(search_text)

  # μν°ν€ μ΄λ²€νΈ
  search_input_box.send_keys(Keys.ENTER)

  # κ²μμ κ±Έλ¦¬λ μκ°λ³΄λ€ μ‘°κΈ λ λλνκ² μ μ§
  time.sleep(5)
```

<br />

### νμ΄μ§ μ΄λ λ° λ§μ§λ§ νμ΄μ§ μ²΄ν¬ ν¨μ(next_page_move)

```python
# @param driver: μμ±νλ driver

def next_page_move(driver:WebDriver):
  # νμ΄μ§λ€μ΄μ μμ­μ λ§μ§λ§ λ²νΌ element μ ν
  next_page_btn = driver.find_element_by_css_selector('div._2ky45>a:last-child')

  # μ νν elementμ htmlλ‘ νμ±νμ¬ λ¬Έμμ΄ νμ€νΈ κ°μ Έμ¬ μ€λΉ
  next_page_class_name = BeautifulSoup(next_page_btn.get_attribute('class'), "html.parser")

  # νμ¬ νμ΄μ§κ° λ§μ§λ§ νμ΄μ§μΌλ, classμ μ΄λ¦μ΄ λ¬λΌμ§μ μ΄μ©ν μ‘°κ±΄λ¬Έ
  if len(next_page_class_name.text) > 10:
    print("κ²μμλ£")

    # μΉ λλΌμ΄λ² μ’λ£
    driver.quit()
    return False
  else:
    # λ€μνμ΄μ§ μ΄λλ²νΌ ν΄λ¦­
    next_page_btn.send_keys(Keys.ENTER)
    return True
```

<br />

`if len(next_page_class_name.text) > 10:`μ΄ μ‘°κ±΄λ¬Έ κ°μ κ²½μ°, μ‘°κ±΄μ μ¬μ©λλ classμ κΈΈμ΄λ μΈμ λ μ§ λ¬λΌμ§ μ μμ΄
λ°κΏμ€μΌν  μλ μμ΅λλ€.

### κ²μκ²°κ³Ό iframe μ΄λ ν¨μ(to_search_iframe)

```python
# @param driver: μμ±νλ driver

def to_search_iframe(driver:WebDriver):
  driver.switch_to.default_content()
  driver.switch_to.frame('searchIframe')
```

<br />

[μ΄μ  ν¬μ€ν](https://yunjaaae.com/python-crawling-and-naver-map-2/#iframe%EA%B0%84-%EC%9D%B4%EB%8F%99)μμ μ€λͺνλ―μ΄, ν νλ©΄μ μ¬λ¬ Iframeμ΄ μμ΄ html νκ·Έ μ νμ λλλ€κΈ° μν΄, `driver.switch_to.default_content()`λ‘ κΈ°λ³Έ Iframe μ΄λ ν, κ²μκ²°κ³Ό Iframeμ idμ 'searchIframe'λ₯Ό argumentλ‘ νλ `driver.switch_to.frame('searchIframe')`λ₯Ό μ€νμμΌ
<br />
Iframe μ νμ μ§νν©λλ€.

### selector elementλ₯Ό νμ€νΈλ‘ λ³ν νλ ν¨μ(get_element_to_text)

```python
# @param element: <class "str">
# @return str

def get_element_to_text(element):
  return BeautifulSoup(element, "html.parser").get_text()
```

<br />

### get_store_data ν¨μ (λ§€μ₯μ λ³΄ μΆμΆ)

```python

# @param driver: μμ±νλ driver
# @paramscroll_container: κ²μκ²°κ³Ό μ€ν¬λ‘€ μμ­
# @param file: μ μ₯ν  νμΌ

def get_store_data(driver:WebDriver, scroll_container: WebElement, file: TextIOWrapper):

  # κ²μκ²°κ³Ό λͺ©λ‘ li elementλ€μ μ ν
  get_store_li = scroll_container.find_elements_by_css_selector('ul > li')

  # νμ¬ νμ΄μ§μ μ‘΄μ¬νλ λ§€μ₯λͺ©λ‘λ§νΌ λ°λ³΅
  for index in range(len(get_store_li)):
    selectorArgument = 'div:nth-of-type(1) > a'
    wrapper_html = get_store_li[index].get_attribute('innerHTML')
    wrapper_soup = BeautifulSoup(wrapper_html, "html.parser")

    # λ§€μ₯ ν­λͺ© ν΄λ¦­
    get_store_li[index].find_element_by_css_selector(selectorArgument).click()

    # λ§€μ₯ IframeμΌλ‘ μ΄λ
    driver.switch_to.default_content()
    driver.switch_to.frame('entryIframe')

    #λ‘λ© μκ° μ μ©
    time.sleep(1)

    try:
      try:
        # μμΈμ λ³΄ νμ΄μ§κ° μμ ν λ‘λ©λ λκΉμ§ κΈ°λ€λ¦Ό
        WebDriverWait(driver,5).until(EC.presence_of_element_located((By.CLASS_NAME, "place_didmount")))
      except TimeoutException:
        to_search_iframe(driver)

      # λ§€μ₯λͺ element μΆμΆ
      store_name = driver.find_element_by_css_selector('#_title > span:nth-child(1)').get_attribute('innerHTML')

      # λ€μ΄λ² μΉ΄νκ³ λ¦¬ element μΆμΆ
      if driver.find_element_by_css_selector('#_title > span._3ocDE').is_displayed():
        naver_category = driver.find_element_by_css_selector('#_title > span._3ocDE').get_attribute('innerHTML')
      else:
        naver_category = ''

      # λ§€μ₯μ£Όμ element μΆμΆ
      address = driver.find_element_by_css_selector('.place_section_content > ul ._2yqUQ').get_attribute('innerHTML')

      # driverλ‘ μ νν elementλ₯Ό νμ€νΈλ‘ λ³ν
      store_name = get_element_to_text(store_name)
      address = get_element_to_text(address)
      naver_category = get_element_to_text(naver_category)

      # csvνμΌμ λ§€μ₯μ λ³΄ μ μ₯
      file.write(store_name + "|" + address + "|" + naver_category + "\n")
      to_search_iframe(driver)
    except TimeoutException:
      to_search_iframe(driver)

```

<br />

### naver_crawl ν¨μ (λ©μΈ μ€ν ν¨μ)

```python
def naver_crawl():
  # λ§€μ₯μ λ³΄λ₯Ό μ μ₯ν  νμΌ μ€ν
  list_file = open('src/list.csv','a',encoding='utf-8')

  # μΉ λλΌμ΄λ²
  driver = get_driver()

  # μ₯μ κ²μ
  search_place(driver,'μ°μΈλνκ΅ λ§μ§')

  # κ²μκ²°κ³Ό IframeμΌλ‘ μ΄λ
  to_search_iframe(driver)

  time.sleep(2)

  try:
    # κ²μκ²°κ³Όλͺ©λ‘ μ€ν¬λ‘€ element μ ν
    scroll_container = driver.find_element_by_id("_pcmap_list_scroll_container")
  except:
    print("μ€ν¬λ‘€ μμ­ κ°μ§ μ€ν¨")

  try:
    while True:
      for i in range(6):
        # μ€ν¬λ‘€μ λ΄λ¦¬λ μλ°μ€ν¬λ¦½νΈ μ½λ μ€ν
        driver.execute_script("arguments[0].scrollBy(0,2000)",scroll_container)
        time.sleep(0.5)

      # λ§€μ₯μ λ³΄ μ μ₯
      get_store_data(driver,scroll_container,list_file)

      # λ€μνμ΄μ§κ° μλμ§ νμΈ μ¬λΆ
      is_continue = next_page_move(driver)
      if is_continue == False:
        break
  except:
    print("ν¬λ‘€λ§ κ³Όμ  μ€ μλ¬ λ°μ")
```

<br />

λ€μ΄λ² μ§λκ°μ κ²½μ°, μ¬ν μ λͺν μ§λ(ex. μΉ΄μΉ΄μ€λ§΅)μ λ€λ₯΄κ² μ€ν¬λ‘€ μ, λ°μ΄ν° λ λλ§μ΄ μ μ©λμ΄ μκΈ° λλ¬Έμ μ€ν¬λ‘€μ λ§¨ νλ¨μΌλ‘ μ΄λμμΌμΌμ§ μμ μ κ·Όμ λ¬Έμ κ° μκΈ°μ§ μμ΅λλ€. μ μ½λμμλ λ°λ³΅λ¬Έμ μ¬μ©νμ¬ μ΄ 6λ² μ€ν¬λ‘€μ μ€νμμΌ°λλ°,
λ°λ³΅λ¬Έ νμλ μ§μ  μ μ©ν΄κ°λ©΄μ μ΅μ ν μν€λ κ²μ μΆμ²λλ¦½λλ€.

<br />

## 4. κ²°κ³Όλ¬Ό

### list.csv

```
store_name|address|naver_category
ν°μλ λ|μμΈ μλλ¬Έκ΅¬ μ°ν¬λ§λ‘ 43-2|νμ°¨μ λ¬Έμ 
μμ€ν¬ν¬λ°μ΄|μμΈ μλλ¬Έκ΅¬ μ°ν¬λ‘11κ°κΈΈ 56 2μΈ΅|μΉ΄ν,λμ νΈ
μΉ΄λ©λ‘μ°λ¨|μμΈ λ§ν¬κ΅¬ μ°ν¬λ‘1κΈΈ 57 1.5μΈ΅|μμ
μΉνλ |μμΈ λ§ν¬κ΅¬ λκ΅λ‘ 262-9 1μΈ΅|λ² μ΄μ»€λ¦¬
κ³΅λ³΅μλΉ|μμΈ μλλ¬Έκ΅¬ μ°μΈλ‘12κΈΈ 23 1μΈ΅|λΌμ§κ³ κΈ°κ΅¬μ΄
μ μ‘λ©΄μ²΄|μμΈ μλλ¬Έκ΅¬ μ°μΈλ‘5λ€κΈΈ 22-8 1μΈ΅ μ μ‘λ©΄μ²΄|μμμμμ
μΉ΄λΌλ©μΌ|μμΈ μλλ¬Έκ΅¬ μ°μΈλ‘7μκΈΈ 34-1 1μΈ΅|μΌλ³ΈμλΌλ©΄
μ€ν°ν¬μ»€νΌ|μμΈ λ§ν¬κ΅¬ μ°ν¬λ‘ 25-1 1μΈ΅ μ€ν°ν¬μ»€νΌ|μΉ΄ν,λμ νΈ
```

<br />

## 5. λ€μ ν¬μ€ν λ―Έλ¦¬λ³΄κΈ°

λ€μ ν¬μ€νμμλ μ μ₯λ λ§€μ₯μ λ³΄μμ μ£Όμλ₯Ό naver geolocationκΈ°λ₯μ μ¬μ©ν΄ μλ κ²½λλ₯Ό λ°ννλ κ³Όμ κ³Ό,
νμ¬ μ μ₯λ ννμΈ csvνμΌ ννμμ μ€μ  dbμ νμ΄λΈλ‘ μ μ₯νλ κ³Όμ μ λ΄μλ³΄κ² μ΅λλ€
κ°μ¬ν©λλ€

### μμΈν μ½λλ [μ¬κΈ°](https://github.com/jeongyunjae/yonsei-univ-matjip)μ

```toc

```
