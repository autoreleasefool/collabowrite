# triggered by the user creating a room
import indicoio
import json
from urllib2 import urlopen
from pprint import pprint
# look up the url format on the website or make a custom url generator?
data = json.load(urlopen('https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location'))
prompt = data["english"]
print prompt

indicoio.config.api_key="8e4a865176f06ec1e1d5797233b177df"
# optimise this to return better keywords
tag = indicoio.text_tags(prompt,independent = True, threshold = 0.05)

#lists
temp = []
dictList = []
for key, value in tag.iteritems():
    #if key = "anime" || "art" || "writing"; Sanitise the genres? Or use the existing story?
    temp = [key,value]
    dictList.append(temp)

def takeSecond(elem):
    return elem[1]

dictList.sort(key=takeSecond,reverse = True)
print dictList[0]
