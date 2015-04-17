module.exports=function(){"use strict";function DOMBuilder(document,disallowActiveAttributes){this.document=document;this.fragment=document.createDocumentFragment();this.currentNode=this.fragment;this.contexts=[];this.pushContext("html",0);this.disallowActiveAttributes=disallowActiveAttributes}DOMBuilder.prototype={pushElement:function(tagName,parseInfo,nameSpace){var node=nameSpace?this.document.createElementNS(nameSpace,tagName):this.document.createElement(tagName);node.parseInfo=parseInfo;this.currentNode.appendChild(node);this.currentNode=node},popElement:function(){this.currentNode=this.currentNode.parentNode},pushContext:function(context,position){this.contexts.push({context:context,position:position})},comment:function(data,parseInfo){var comment=this.document.createComment("");comment.nodeValue=data;comment.parseInfo=parseInfo;this.currentNode.appendChild(comment)},attribute:function(name,value,parseInfo){var attrNode=this.document.createAttribute(name);attrNode.parseInfo=parseInfo;if(this.disallowActiveAttributes&&name.substring(0,2).toLowerCase()==="on"){attrNode.nodeValue=""}else{attrNode.nodeValue=value}this.currentNode.attributes.setNamedItem(attrNode)},text:function(text,parseInfo){var textNode=this.document.createTextNode(text);textNode.parseInfo=parseInfo;this.currentNode.appendChild(textNode)}};return DOMBuilder}();