// grab the html files as js variables
import {citing_sources} from './citingSources1.html';
import {didnt_find} from './didntFindIt1.html';
import {getting_started} from './gettingStarted1.html';
import {guides} from './guides1.html';
import {library_locations} from './libraryLocations.html'
import {saving_results} from './savingResults1.html';
import {video_tutorials} from './videoTutorials1.html';
import {whats_in_search} from './whatsInSearch1.html';


export const ls_help_menu_items = [
  {
    "id":"citing-sources",
    "title":"Citing Sources",
    "icon":{"code":"description","group":"action"},
    "template":citing_sources
  },
  {
    "id":"didnt-find",
    "title":"Didn't find it?",
    "description":`TBD info about ILL, scope of collections, and problem cases`,
    "template":didnt_find,
    "icon":{"code":"swap_horiz","group":"action"},
  },
  {
    "id":"getting-started",
    "title":"Getting Started",
    "description":"brief static html content with an overview on how to use BULS; links to direct to main BULS help page in WordPress, other pages, and/or other sections of the menu",
    "icon":{"code":"description","group":"action"},
    "template":getting_started
  },
  {
    "id":"guides",
    "title":"Guides",
    "description":`info about research, subject, course, and how to guides; how to find in BULS by way of search and related more info links; link out to LibGuides home`,
    "template":guides,
    "icon":{"code":"directions","group":"maps"}
  },
  {
    "id":"library-locations",
    "title":"Library Locations",
    "template":library_locations,
    "icon":{"code":"directions","group":"maps"}
  },
  {
    "id":"saving-results",
    "title":"Saving Results",
    "description":"information about My Favorites, exporting results, ref managers",
    "template":saving_results,
    "icon":{"code":"save","group":"content"}    
  },
  {
    "id":"video-tutorials",
    "title":"Video Tutorials",
    "template":video_tutorials,
    "icon":{"code":"save","group":"content"}    
  },
  {
    "id":"whats-in-search",
    "title":"What's in Search?",
    "template":whats_in_search,
    "icon":{"code":"save","group":"content"}    
  }
];