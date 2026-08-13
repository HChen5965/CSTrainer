# 使用轻量级 Python 3.10 基础镜像
FROM python:3.10-slim

# 设置容器内工作目录
WORKDIR /app

# 安装必要的系统依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential && \
    rm -rf /var/lib/apt/lists/*

# 复制依赖文件并安装
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制后端项目代码
COPY . .

# 暴露端口
EXPOSE 8000

# 启动 FastAPI 应用服务
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]