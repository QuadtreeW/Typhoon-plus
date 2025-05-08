import json

def parse_line(line, name=None):
    if line.startswith('66666'):
        # 这是一个头记录
        name = line[30:56].strip()
        if name == "(nameless)":
            return None, None
        else:
            return name, None
    elif name is not None:
        # 这是一个路径记录
        fields = line.split()
        date = fields[0]
        intensity = int(fields[1])
        lat = int(fields[2]) / 10
        long = int(fields[3]) / 10
        pres = int(fields[4])
        wnd = int(fields[5])
        third_value = 1010 - pres
        return name, [long, lat, third_value, intensity, name, date, wnd, pres]
    else:
        return None, None

# 从 txt 文件中读取数据
with open('CH1991BST.txt', 'r') as file:
    lines = file.readlines()

# 解析数据
name = None
parsed_data = []
for line in lines:
    name, record = parse_line(line, name)
    if record is not None:
        parsed_data.append(record)

# 转换为 JSON
json_data = json.dumps(parsed_data, ensure_ascii=False,separators=(',', ':'))

# 保存为 JSON 文件
with open('1991.json', 'w', encoding='utf-8') as f:
    f.write(json_data)

# 打印 JSON 数据
# print(json_data)