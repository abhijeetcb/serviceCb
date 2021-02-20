pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-u root:root -p 3006:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deliver') {
            steps {
                sh 'deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh 'kill.sh'
            }
        }

    }
}
