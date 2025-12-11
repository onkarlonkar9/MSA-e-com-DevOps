pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerHubCreds')
        USERNAME = "onkarlonkar9"

        BACKEND_IMAGE = "backend-api:v1"
        VENDOR_UI_IMAGE = "frontend-vendor:v2"
        CUSTOMER_UI_IMAGE = "frontend-customer:v2"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling project from GitHub..."
                git branch: 'main', url: 'https://github.com/onkarlonkar9/mobile-shopping-app-DevOps.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node dependencies..."
                sh '''
                    cd backend && npm install
                    cd ../Frontend\\(vendor\\) && npm install
                    cd ../Frontend\\(customer\\) && npm install
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images..."
                sh """
                    docker build -t ${USERNAME}/${BACKEND_IMAGE} backend
                    docker build -t ${USERNAME}/${VENDOR_UI_IMAGE} Frontend\\(vendor\\)
                    docker build -t ${USERNAME}/${CUSTOMER_UI_IMAGE} Frontend\\(customer\\)
                """
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo "Pushing images to DockerHub..."
                sh """
                    echo "${DOCKERHUB_PSW}" | docker login -u "${DOCKERHUB_USR}" --password-stdin
                    
                    docker push ${USERNAME}/${BACKEND_IMAGE}
                    docker push ${USERNAME}/${VENDOR_UI_IMAGE}
                    docker push ${USERNAME}/${CUSTOMER_UI_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}

