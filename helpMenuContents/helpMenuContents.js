/* - grab the html files as js variables - */

// updates 
import {course_reserves} from './courseReserves.html';
import {hathitrust_avaliability} from './hathitrust.html';
import {visiting_the_libraries} from './visitingTheLibraries.html';

// help items
import {account} from './account.html';
import {ask_us} from './askUs.html';
import {citing_sources} from './citingSources.html';
import {didnt_find} from './didntFindIt.html';
import {getting_started} from './gettingStarted.html';
import {guides} from './guides.html';
import {library_locations} from './libraryLocations.html'
import {saving_results} from './savingResults.html';
//import {tell_us} from './tellUsWhatYouThink.html';
import {video_tutorials} from './videoTutorials.html';
import {whats_in_search} from './whatsInSearch.html';


// form into a list
export const ls_help_menu_updates = [
  {
    "id":"course-reserves",
    "title":"Course Reserves/Materials",
    "description":"finding course reserves and materials",
    "icon":{"code":"move_to_inbox","group":"content"},
    "template":course_reserves
  },
  {
    "id":"hathitrust-availability",
    "title":"Hathi Trust Availability",
    "description":"the hathitrust emergency temporary access service (ETAS) allows online reading access to selected materials",
    "icon":{"code":"link","group":"content"},
    "template":hathitrust_avaliability
  },
  {
    "id":"visiting-the-libraries",
    "title":"Visiting the Libraries",
    "description":"discussion of covid-related changes to bu libraries operation",
    "icon":{"code":"business","group":"communication"},
    "template":visiting_the_libraries
  }
];
export const ls_help_menu_items = [
  {
    "id":"getting-started",
    "title":"Getting Started",
    "description":"brief static html content with an overview on how to use BULS; links to direct to main BULS help page in WordPress, other pages, and/or other sections of the menu",
    "icon":{"code":"description","group":"action"},
    "template":getting_started
  },
  {
    "id":"video-tutorials",
    "title":"Video Tutorials",
    "template":video_tutorials,
    "icon":{"code":"shop_two","group":"action"}    
  },
  {}, // DIVIDER, // search-specific
  {
    "id":"whats-in-search",
    "title":"What's in Search?",
    "template":whats_in_search,
    "icon":{"code":"toc","group":"action"}    
  },
  {
    "id":"didnt-find",
    "title":"Didn't find it?",
    "description":`TBD info about ILL, scope of collections, and problem cases`,
    "template":didnt_find,
    "icon":{"code":"swap_horiz","group":"action"},
  },
  {}, // DIVIDER, // meta help content  
  {
    "id":"guides",
    "title":"Guides",
    "description":`info about research, subject, course, and how to guides; how to find in BULS by way of search and related more info links; link out to LibGuides home`,
    "template":guides,
    "icon":{"code":"directions","group":"maps"}
  },
  {}, // DIVIDER, // features
  {
    "id":"saving-results",
    "title":"Saving Results",
    "description":"information about My Favorites, exporting results, ref managers",
    "template":saving_results,
    "icon":{"code":"save","group":"content"}    
  },
    {
    "id":"citing-sources",
    "title":"Citing Sources",
    "icon":{"code":"create","group":"content"},
    "template":citing_sources
  },
  {
    "id":"account",
    "title":"Account",
    "icon":{"code":"account_box","group":"action"},
    "template":account
  },
  {}, // DIVIDER, // about
  {
    "id":"library-locations",
    "title":"Library Locations",
    "template":library_locations,
    "icon":{"code":"place","group":"maps"}
  },
  {}, // DIVIDER, // contact
  {
    "id":"ask-us",
    "title":"Ask Us",
    "template":ask_us,
    "icon":{"code":"forum","group":"communication"}
  }
];