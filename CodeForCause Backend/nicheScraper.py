# Credit Hans Bas 2018

import pandas as pd
from bs4 import BeautifulSoup
import requests
import sys

url = sys.argv[1] if len(sys.argv) >= 3 else input('Please enter the niche.com search results url: ')

if 'niche.com' not in url:
    print('Sorry! This script only works with the website niche.com!')
    exit(0)

file_name = sys.argv[2] if len(sys.argv) >= 3 else input('Please enter the name of the file you wish to output to: ')

r = requests.get(url)
s = BeautifulSoup(r.content, 'html.parser')

search_results = s.findAll('div', {'class': 'search-result'})

primary_data = ['School', 'Address', 'Overall Niche Grade']
niche_grade_rubric = ['Academics', 'Diversity', 'Teachers', 'College Prep', 'Clubs & Activities',
                      'Health & Safety', 'Administration', 'Sports', 'Food', 'Resources & Facilities']

data = {k : [] for k in primary_data + niche_grade_rubric}

for s in search_results:

    link = s.findAll('a', {'class': 'search-result__link'})[0]['href']
    title = s.findAll('h2', {'class': 'search-result__title'})[0].next

    data['School'].append(title)

    r_inner = requests.get(link)
    s_inner = BeautifulSoup(r_inner.content, 'html.parser')

    address = s_inner.findAll('div', {'class': 'profile__address'})[0]
    address_inner_div = address.select('div')[1].select('div')
    address_inner_split = ''.join(map(str, address_inner_div[1].contents)).split(' ')
    street = address_inner_div[0].next
    town_city = address_inner_div[1].next
    state = ''.join(map(str, address_inner_div[1].contents))[-9:-7]
    zip = ''.join(map(str, address_inner_div[1].contents))[-5:]
    mailing_address = '{}, {}, {} {}'.format(street, town_city, state, zip)

    data['Address'].append(mailing_address)
    print('{}|{}'.format(title, mailing_address))

    overall_niche_grade = s_inner.findAll('div', {'class': 'overall-grade__niche-grade'})[0].findAll('div', {'class': 'niche__grade'})[0].next
    data['Overall Niche Grade'].append(overall_niche_grade)
    print('Overall Niche Grade: {}'.format(overall_niche_grade))

    niche_grades = s_inner.findAll('div', {'class': 'report-card'})[0].findAll('ol', {'class': 'ordered__list__bucket'})[0].findAll('div', {'class': 'niche__grade'})

    for i in range(len(niche_grade_rubric)):
        data[niche_grade_rubric[i]].append(niche_grades[i].next)
        print('{}: {}'.format(niche_grade_rubric[i], niche_grades[i].next))

writer = pd.ExcelWriter(file_name + '.xlsx')
pd_data = pd.DataFrame(data)
pd_data = pd_data[primary_data + niche_grade_rubric]
pd_data.to_excel(writer, 'Sheet1', index=False)
writer.save()
