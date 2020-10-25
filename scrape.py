import argparse
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import json
import geocoder
from azure.cosmos import CosmosClient, exceptions
url = "a" 
key = "test"
client = CosmosClient(url, credential= key)
database = "hacktx_addresses"
try:
    database = client.create_database(database)
except exceptions.CosmosResourceExistError:
    database = client.get_database_client(database)
container_name = 'addresses'
container = database.get_container_client(container_name)
def get_coord(address):
    #g = geocoder.google(address, key ='AIzaSyCogh5_2lxRy8SPG8rHaXaY0-umKhl1UyA')
    return [30.285560,-97.752790]
    #return g.latlong
def parse_text(text, photo_url, address):
    txt = text.split("\n")
    line1 = txt[0]
    index = txt[0].index("bd")
    while index>0:
        if line1[index].isnumeric():
            break
        index-=1
    bed = float(line1[index])
    index=txt[0].index("bd")+2
    bath = float(line1[index:line1.index("ba")-1])
    sqindex = line1.index("sqft")
    if line1[sqindex-1]==" ":
        sqindex-=1
    sq_feet = line1[line1.index("ba")+2:sqindex]
    index = text.index("Zestimate")+12
    index1 = index+1
    while True:
        if text[index1]!="," and not text[index1].isnumeric():
            break
        index1+=1
    if index1 == index+1:
        index = text.index("$")
        index1 = index+1
        comma = 3
        while text[index1].isnumeric() or text[index1]==",":
            if text[index1].isnumeric():
                comma-=1
                if comma < 0:
                    break
            else:
                comma = 3
            index1+=1
        price = text[index:index1]
    else:
        price = text[index:index1]
    if "/mo" not in text:
        rent = "does not exist"
    else:
        index = text.index("/mo")
        while text[index] != "$":
            index-=1
        rent = text[index+1:text.index("/mo")]
    coordinates = get_coord(address)
    print("finished parsing")
    dicts = {
            "photo":photo_url,
            "price":price,
            "rent":rent+"/month",
            "address":address,
            "bedrooms":bed,
            "bathrooms":bath,
            "sqfeet":sq_feet,
            "location":{"latitude":coordinates[0],"longtitude":coordinates[1]}
    }
    #with open("./file.json", "w")as outputfile:
    #    json.dump(dicts, outputfile)
    container.upsert_item(dicts)
def main(address):
    driver = webdriver.Chrome("./chromedriver") 
    driver.get("https://www.zillow.com") 
    if address == None:
            driver.find_element_by_class_name("react-autosuggest__suggestion react-autosuggest__suggestion--first").click()
    else:
            textbox = WebDriverWait(driver,100).until(
                    EC.presence_of_element_located((By.ID, "search-box-input"))
            )
            textbox.click()
            time.sleep(1)
            textbox.send_keys(Keys.ENTER)
            time.sleep(1)
            button = driver.find_element_by_xpath('//button[text()="Skip this question"]')
            if button != None:
                    button.click()
            time.sleep(1)
            textbox = WebDriverWait(driver,100).until(
            EC.presence_of_element_located((By.CLASS_NAME, "react-autosuggest__input"))
            )
            textbox.send_keys(Keys.CONTROL+"a")
            textbox.send_keys(Keys.DELETE)
            textbox.send_keys(address)	
            time.sleep(1)
            textbox.send_keys(Keys.ENTER)
            time.sleep(1)
            elem = driver.find_element_by_class_name("ds-chip")
            if elem != None:
                    text = elem.text
                    photo = driver.find_element_by_class_name("photo-tile-image").get_attribute('src')
                    driver.close()
                    parse_text(text, photo, address)
if __name__ == "__main__":
	main("2101 N Lamar Blvd APT 7, Austin, TX 78705")
#parser = argparse.ArgumentParser(description='address goes here')
#parser.add_argument('-address',action = "store",dest = "arg", type = str, default = None, help = 'type argument here' )
#args = parser.parse_args()
#main(args.arg)
