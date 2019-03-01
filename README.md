# `primo-explore-bu`

Boston University Libraries' customization packages for the for the new Primo UI.

## Background

Below are some brief descriptions of each view as of 2018-09-04.

|env |name|description|
|:---|:---|:----------|
|prod|`BU`|main default view, running in [production](http://buprimo.hosted.exlibrisgroup.com/primo-explore/search?vid=BU) since January 2017|
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
$ git clone https://github.com/bulib/primo-explore-devenv-bu.git ./
```

### Running a Particular View

1. You should be able to run the server via `gulp run`, and you can specify the view directly by adding `--view VIEW_NAME`. 
  The views list is determined by the folders you have in the `primo-explore/custom` folder.
```bash
$ gulp run --view BU --browserify
```
2. To access your running instance, go to [localhost:8003/primo-explore/search?vid=BU](http://localhost:8003/primo-explore/search?vid=BU&sortby=rank&lang=en_US)

### Making Changes to the View

_note: assumes environment is already set up_

1. update your local repository to match the current state in github:
```
$ cd path/to/primo-explore/
$ git checkout master  # switch to the master branch
$ git pull origin master  # update local copy with remote changes 
```
2. create a branch with a name describing the task
```
$ git checkout -b my-branch-name
```
3. make your desired changes, running them locally (as described above)
4. commit your changes and push them to your branch
```
$ git add .  # add all of your changes to what's about to be commited (fill the box with items)
$ git commit -m "WEB-123: description of what effect your changes have on what view"  # package and describe changes (wrap the gift)
$ git push origin my-branch-name  # publish these changes to your branch where others can see them (ship the wrapped gift to its desired location)
```
5. [create a pull request](https://github.com/bulib/primo-explore-bu/compare) from your branch to `master`
- visit this repository's home page and click on the 'Compare & pull request' button or on 'New pull request'
![compare-and-pull-request-banner](https://user-images.githubusercontent.com/5565284/50294604-41d0c900-0444-11e9-9fa4-66f3e0cbd11a.png)
- visit the ['/compare' page](https://github.com/bulib/primo-explore-bu/compare) and select `my-branch-name` from the 'compare: ' dropdown on the right
![compare-page-dropdown-select](https://user-images.githubusercontent.com/5565284/50294823-bd327a80-0444-11e9-80fd-bc812e81a671.png)
6. notify team members by adding a link to the created pull request (e.g. [/bulib/primo-explore-bu/pull/7](https://github.com/bulib/primo-explore-bu/pull/7)) to the related ticket in Jira.

### Deploying your updated View

1. When you're satisfied with your changes and wish to deploy them to one of the environments, run the following to 
  create a new `.zip` in `packages/VIEW_NAME.zip`. 
```bash 
$ gulp create-package --view VIEW_NAME
``` 
2. To make these changes public, you'll have to use the [primo back office](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/060Back_Office_Guide/060Configuring_Primo%E2%80%99s_Front_End/020Views_Wizard) 
  and upload the package there ([prod](http://buprimo.hosted.exlibrisgroup.com:1601/primo_publishing/admin/acegilogin.jsp), 
  [stage](http://bu-primostage.hosted.exlibrisgroup.com:1601/primo_publishing/admin/acegilogin.jsp)). 

Note: **Be very careful which site you're uploading it to**, since environment is determined by the URL and isn't overly 
  visible in the UI itself. 

## External Links

Further documentation can be found at:
- ExLibrisGroup's template/[example view](https://github.com/ExLibrisGroup/primo-explore-package)
- ExLibrisGroup's [best practices documentation](http://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_Interface/New_UI_Customization_-_Best_Practices)
- ExLibrisGroup's [back office configuration docs](http://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_Interface/Back_Office_Configuration_for_New_UI) 
