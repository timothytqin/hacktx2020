import argparse
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import json

def parse_text(text):
	txt = text.split("\n")
	line1 = txt[0].split(" ")
	bed = float(line1[0])
	bath = float(line1[1][2:])
	sq_feet = line1[2][2:]
	line3 = txt[2].split("$")
	price = line3[1][0:line3[1].index("Rent")]
	rent = line3[2][0:line3[2].index("/mo")]
	print("finished parsing")
	dict = {
		"price":price,
		"rent":rent,
		"address":txt[1],
		"bedrooms":bed,
		"bathrooms":bath,
		"sqfeet":sq_feet,
	}
	with open("./file.json", "w")as outputfile:
		json.dump(dict, outputfile)
def main(address):
	driver = webdriver.Chrome("./chromedriver")
	driver.get("https://www.zillow.com")
	if address == None:
		#find all places near me
		driver.find_element_by_class_name("react-autosuggest__suggestion react-autosuggest__suggestion--first").click()
	else:
		textbox = WebDriverWait(driver,100).until(
			EC.presence_of_element_located((By.ID, "search-box-input"))
		)
		#textbox = driver.find_element_by_id("search-box-input")
		textbox.click()
		time.sleep(1)
		textbox.send_keys(Keys.ENTER)
		time.sleep(1)
		button = driver.find_element_by_xpath('//button[text()="Skip this question"]')
		if button != None:
			button.click()
		if address == None:
			#do nothing
			exit(1)
		else:
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
				driver.close()
				parse_text(text)
			else:
				driver.close()
				print("address not found")
				exit(1)
		#time.sleep(10)
#if __name__ == "__main__":
#	main("8212 Salado Springs Drive Plano  75025")
parser = argparse.ArgumentParser(description='address goes here')
parser.add_argument('-address',action = "store",dest = "arg", type = str, default = None, help = 'type argument here' )
args = parser.parse_args()
main(args.arg)