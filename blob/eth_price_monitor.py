import requests
import time
from datetime import datetime

def get_eth_price():
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": "ethereum",
        "vs_currencies": "usd"
    }
    try:
        response = requests.get(url, params=params)
        data = response.json()
        return data["ethereum"]["usd"]
    except Exception as e:
        print(f"获取价格时出错: {e}")
        return None

def main():
    print("开始监控ETH价格...")
    previous_price = None
    
    while True:
        current_price = get_eth_price()
        if current_price is not None:
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{current_time}] ETH当前价格: ${current_price}")
            
            if previous_price is not None:
                price_change = ((current_price - previous_price) / previous_price) * 100
                if price_change > 0.5:
                    print("上涨了！")
                elif price_change < -0.5:
                    print("下跌了！")
            
            previous_price = current_price
        
        time.sleep(60)  # 每分钟检查一次

if __name__ == "__main__":
    main() 