# `primo-explore-devenv-bu`

Boston University Libraries' customizations to the new Primo UI [BU Libraries Search](https://www.bu.edu/library/search)

## Background

### Primo Explore

- this repository exists to help track **customizations** we're making to our main
  [discovery service](https://libtechlaunchpad.com/2017/03/08/discovery-services-basics-and-resources/).
- it works within a provided **development enivronment** managed by the `ExLibrisProject` in the
  [`primo-explore-devenv` repository](https://github.com/ExLibrisGroup/primo-explore-devenv/)
- these customizations hide, augment, adjust, fill out, and add functionality to the existing
  - icons (`img/`),
  - styles and colors (`css/`),
  - home, help, and email templates (`html/`), and
  - some additional tracking/library imports (`js/`).

### The CENTRAL_PACKAGE

The bulk of the **theming and branding** changes are managed in the `custom/CENTRAL_PACKAGE` repository.
  What's included in this common, shared entity cascades into every other view, unless it's explictly ovewritten.

### The Views

There are a number of variations and distinctions we form (and functionality we add) _beyond_ the overall theme
  to suit particular needs/desires. These are managed separately in what are called 'views', and `BU` is our main one.

Below are some brief descriptions of each view as of 2020-02-11.

|env |name|description|
|:---|:---|:----------|
|prod|`BU`|main default view, running in [production](https://www.bu.edu/library/search) since January 2017|
|prod|`ISL`|'Industry Survey Locator' that we manage for the [Pardee library](http://www.bu.edu/library/management/research/industrysl/)|
|prod|`BULAW`|Law Library's custom view|
|prod|`journals`|secondary view scoped to journals/newspapers from alma only|
|prod|`london`|London library scoped to only their resources|
|prod|`cgcm`|Specialty view for 'School of Theology - History of Missiology'. (undeployed/low use)|
|test|`newUIDev`|testing view for experimenting with new ideas|
|test|`features`|another testing view deployed as staff features testing site|
|test|`tmp/preview`|past experiments with various primo updates/customization methods|

### Help Menu Contents

An additional, non-standard aspect of this library is the collection of help information contained within the `helpMenuContents/`
  directory. This exists to fill out the popup menu created via our
  [`primo-explore-help-menu`](https://www.npmjs.com/package/primo-explore-help-menu) package.

## Usage

### Setting up the Environment

In order for this project to work correctly, it must be set up to be run inside of the
  [`primo-explore-devenv`](https://github.com/ExLibrisGroup/primo-explore-devenv/) project:

1. Download a [zip version](https://github.com/ExLibrisGroup/primo-explore-devenv/archive/master.zip) of that,
  unzip it, and then `cd` into its main folder.
2. Follow steps 1-8 in [its `README`](https://github.com/ExLibrisGroup/primo-explore-devenv#installation) to
  install what you'll need to run it.
3. Update the `PROXY_SERVER` variable in the [`gulf/config.js` file](https://github.com/ExLibrisGroup/primo-explore-devenv/blob/master/gulp/config.js#L150)
  to `'https://bu-primostage.hosted.exlibrisgroup.com:443'`.
4. Navigate to `primo-explore/` subdirectory, remove the existing (empty) folders, and replace them with a clone of this repo.

```bash
$ cd primo-explore/
$ rm -rf custom/ tmp/
$ git clone https://github.com/bulib/primo-explore-devenv-bu.git ./
```

### Running Locally

1. Make sure you are in the `primo-explore/custom` directory and run the following:

```bash
$ npm run start  # run the CENTRAL_PACKAGE
$ npm run start:view -- VIEW_NAME  # run a particular VIEW_NAME (e.g. 'BU', 'BULAW')
```

2. Open your browser to [localhost:8003/primo-explore/search?vid=default](http://localhost:8003/primo-explore/search?vid=default&sortby=rank&lang=en_US)

### Making Changes

1. update your local repository to match the current state in github

```bash
$ cd path/to/primo-explore/
$ git checkout master  # switch to the master branch
$ git pull origin master  # update local copy with remote changes
```

2. create a branch with a name based on the ticket number (or succinctly describing the task)

```bash
# git checkout -b JIRA_TICKET_ID
$ git checkout -b WEB-123
```

3. make your desired changes, running them locally (as described above)

4. commit your changes (regularly) and push them to your branch

```bash
$ git add .  # add your changes to what's about to be commited (fill the box with items)
$ git commit -m "WEB-123: description of what effect your changes have on what view"  # package and describe changes (wrap the gift)
$ git push origin WEB-123  # publish these changes to your branch where others can see them (ship the wrapped gift to its desired location)
```

5. [create a pull request](https://github.com/bulib/primo-explore-bu/compare) from your branch to `master` and solicit feedback from others

### Deploying your updated package

1. When you're satisfied with your changes and wish to deploy them to one of the environments, run the following to
  create a new `.zip` in `packages/`.

```bash
$ npm run build  # build the CENTRAL_PACKAGE
$ npm run build:view VIEW_NAME  # build a given VIEW_NAME
```

2. To make these changes public, you'll have to use the administrative interface called the
  [primo back office](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/060Back_Office_Guide/060Configuring_Primo%E2%80%99s_Front_End/020Views_Wizard)
  and upload the package there ([stage](http://bu-primostage.hosted.exlibrisgroup.com:1601/primo_publishing/admin/acegilogin.jsp),
  [prod](http://buprimo.hosted.exlibrisgroup.com:1601/primo_publishing/admin/acegilogin.jsp)).

Note: **Be very careful which site you're uploading it to**, since environment is determined by the URL and isn't overly
  visible in the UI itself. There's not a great way to undo a change/deployment.

## External Links

Further documentation can be found at:

- ExLibrisGroup's template/[example view](https://github.com/ExLibrisGroup/primo-explore-package)
- ExLibrisGroup's [best practices documentation](http://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_Interface/New_UI_Customization_-_Best_Practices)
- ExLibrisGroup's [back office configuration docs](http://knowledge.exlibrisgroup.com/Primo/Product_Documentation/New_Primo_Interface/Back_Office_Configuration_for_New_UI)
