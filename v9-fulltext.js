/***
*     @author Victor Chimenti, MSCS-SE '20
*     @file v9-fulltext.js
*     v9/fulltext
*
*     This new content type is a hybrid being adapted from the knowledge base
*     content type used by IT Services and the News type available to all departments.
*     It is intended to provide a searchable, sortable group of articles that can be
*     exported to and used by any department when they need a summary and image to
*     align responsively in an organizer layout.
*
*     This content layout will be the full text layout that the organizer layout links to.
*
*     Document will write once when the page loads
*
*     @version 3.1
*/

try {
    /* -- Assign all the things -- */
    var articleTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Article Title' output='normal' display_field='value' />"); 
    var articleFullBody = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Full Article' output='normal' display_field='value' />");
    var featureImage = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Thumbnail image' output='normal' formatter='path/*' />");
    var altFeatureImage = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Alt Image' output='normal' modifiers='striptags,htmlentities' />");
    var externalLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='External Link' output='normal' use-element='true' filename-element='External Link' modifiers='striptags,htmlentities' />");
    var anchorTag = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='html_anchor' />");
    var contentID = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='meta' meta='content_id' />");
    var lastModified = '<div class="lastModified" style="display:inline-block"><p>Last modified: <t4 type="meta" meta="last_modified" format="MMMM d, yyyy" /></p></div>'; 
    var listOfTags = "";
    var featureImageString = "";
  
  
    /* -- Prepare all the things -- */
    var beginningHTML = '<div class="newsArticleWrapper contentItem" aria-label="' + articleTitle + '" id="id' + contentID + '" data-position-default="ZoneA" data-position-selected="ZoneA"/>"><article class="newsArticle">';
    var endingHTML = '</article></div>';

  
  
    /* determine which link, if any, goes on the image */
    if (externalLink == "") {
        featureImageString = '<div class="newsArticleFeatureImage"><img src="' + featureImage + '" class="articleImage" alt="' + altFeatureImage + '" /></div>';
    } else {
        featureImageString = '<div class="newsArticleFeatureImage"><a href="' + externalLink + '" target="_blank"><img src="' + featureImage + '" class="articleImage" alt="' + altFeatureImage + '" /></a></div>';
    }
    
  
    /* -- Write all the things -- */
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, anchorTag));
    document.write('<div class="newsArticleHeader"><h2 class="articleTitle">' + articleTitle + '</h2></div>');
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, featureImageString));
    document.write('<div class="articleText standardContent">' + articleFullBody + '</div>'); 
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, lastModified));
    document.write(endingHTML);
  
  
  } catch (err) {
    document.write(err.message);
  }
  