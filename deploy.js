/*
"dependencies": {
    "gh-pages": "^1.0.0",
    "ncp": "^2.0.0",
    "rimraf": "^2.6.1"
}
*/

const execSync = require('child_process').execSync;
const fs = require('fs');
const ghpages = require('gh-pages');
const ncp = require('ncp').ncp;
const path = require('path');
const rimraf = require('rimraf');
const packageJson = require('./package.json');
const repository = packageJson['homepage'] || null;

const pathToBuild = 'dist';
const outputDirectory = 'build'
const destinationBranch = 'gh-pages'

console.time('Deployment Time');

function removeDirectory(dir, callback) {
    rimraf(dir, function() {
        callback()
    });
}

function removeDirectories() {
    removeDirectory(outputDirectory, function() {
        removeDirectory(pathToBuild, function(){
            console.log('________________________________________________________________________________________________________');
            console.log(`Deployment complete. Check gh-pages branch for docs directory.  The local ${outputDirectory} and ${pathToBuild} directories has been removed.`);
            console.log('‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾');
            console.timeEnd('Deployment Time');
        });
    });

}

function pushToGhPages() {
    rimraf('node_modules/gh-pages/.cache', function(){
        let publishOptions = {
                'branch': destinationBranch,
                'dest': `docs`,
                'repo': repository + '.git'
        }
        if (destinationBranch === 'gh-pages') {
            publishOptions = {
                    'branch': destinationBranch,
                    'repo': repository + '.git'
            }
        }
        ghpages.publish(outputDirectory, publishOptions,
            function(error) {
                if (error) {
                    console.log('Push to remote failed, please double check that the homepage field in your package.json links to the correct repository.');
                    console.log('The build has completed but has not been pushed to github.');
                    return console.error(error);
                }
                console.log(`The production build is ready and has been pushed to the remote branch.`);

                removeDirectories()
            }
        );
    })
}

function copyFiles(originalFile, newFile, callback) {
    ncp.limit = 16;
    ncp(originalFile, newFile, function(error) {
        if (error) {
            return console.error(error);
        }

        callback()
    });  
}

function runBuild() {
    execSync(`npm run build`, { 'stdio': [0, 1, 2] });
    // execSync(`mkdir ${outputDirectory}`);
    if (!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory);
    }
    
    copyFiles(pathToBuild, path.resolve(`${outputDirectory}/${pathToBuild}`), () => {
        copyFiles('index.html', path.resolve(`${outputDirectory}/index.html`), () => {
            pushToGhPages()
        })
    })    
}

runBuild();
