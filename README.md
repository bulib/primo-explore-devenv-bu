# `primo-explore-bu`

A set of views to for Boston University Libraries' primo customization packages.

## Background

Below are some brief descriptions of each view as of 2018-09-04.

|env |name|description|
|:---|:---|:----------|
|prod|`BU`|main default view|
|prod|`journals`|secondary view scoped to journals/newspapers from alma only|
|prod|`BULAW`|Law Library's custom view|
|prod|`london`|London library scoped to only their resources|
|prod|`cgcm`|Specialty view for 'School of Theology - History of Missiology'. low use|
|stage|`dev2`|'clone' of BU prod|
|stage|`preview`|primary testing view for Mike|
|test|`newUIDev`|one of Mike's testing views|
|test|`features`|to be deployed as staff features testing site|

## Usage

### Setting up the Environment

1. This package is meant to run inside of `ExLibrisProject`'s [`primo-explore-devenv` project](https://github.com/ExLibrisGroup/primo-explore-devenv/), so
  download a ZIP version of that first, unzip it, and then `cd` into its main folder.
2. Follow steps 1-8 in its `README` to install what you'll need to run it locally.
3. Update the `PROXY_SERVER` variable in the [`gulf/config.js` file](https://github.com/ExLibrisGroup/primo-explore-devenv/blob/master/gulp/config.js#L150)
  to `'https://bu-primostage.hosted.exlibrisgroup.com:443'`.
4. Navigate to `primo-explore/` subdirectory, remove the existing (empty) folders, and replace them with a clone of this repo. 

_Note: This will give you a number of our views to test out locally_
```bash 
$ cd primo-explore/
$ rm -rf custom/ tmp/
$ git clone https://github.com/bulib/primo-explore-bu.git ./
```

### Running a Particular View

1. You can run the server via `gulp run`, and you can specify the view directly by adding `--view VIEW_NAME`. The views 
  list is determined by the folders you have in the `primo-explore/custom` folder.
2. To access your running instance, go to [localhost:8003/primo-explore/search?vid=BU](http://localhost:8003/primo-explore/search?vid=BU&sortby=rank&lang=en_US)

### Deploying your updated View

1] When you're satisfied with your changes and wish to deploy them to test or deploy them to prod, run the following to 
  create a new `.zip` in `packages/VIEW_NAME.zip`. You can specify your view by the previously mentioned method.
```bash 
$ gulp create-package
``` 
2] To make these changes public, you'll have to use the [primo administrative site]() and upload the package. 

Note: **Be very careful which site you're uploading it to**, since environment is determined by the URL and isn't overly 
  visible in the UI itself 
   