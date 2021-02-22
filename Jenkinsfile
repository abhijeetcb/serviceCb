pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-u root:root -p 3008:5000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install '
            }
        }
        stage('Deliver') {
            steps {
                sh './deliver.sh'
            }
        }

    }
}
