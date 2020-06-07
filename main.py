import eel
import psutil as monitor
import json


# sending get_data() to frontend
@eel.expose
def get_data():
    data = {
        'download_amt': {'value': 0, 'prefix': ''},
        'upload_amt': {'value': 0, 'prefix': ''}
    }
    data['upload_amt']['value'] = monitor.net_io_counters()[0]
    data['download_amt']['value'] = monitor.net_io_counters()[1]

    prefix_list = ['bytes', 'kilo bytes', 'mega bytes', 'giga bytes', 'tera bytes', 'peta bytes']

    for key in data:

        index = 0
        while data[key]['value'] > 1000:
            data[key]['value'] /= 1000
            index += 1

        data[key]['value'] = round(number=data[key]['value'], ndigits=1)
        data[key]['prefix'] = prefix_list[index]

    json_data = json.dumps(data)

    return json_data


eel.init('web')
eel.start('main.html')
