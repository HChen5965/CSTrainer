# CSTrainer Docker Image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Set Python path
ENV PYTHONPATH=/app

# Start API service
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]