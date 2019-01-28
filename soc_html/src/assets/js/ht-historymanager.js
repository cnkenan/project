!function(A,b,i){"use strict";var l="ht",M=A[l],y=M.Default,x=y.def,Y=y.getInternal();M.HistoryManager=function(T){this._histories=[],this.setDataModel(T)},x(M.HistoryManager,b,{ms_ac:["dataModel","histories","historyIndex","maxHistoryCount","disabled"],ms_fire:1,_historyIndex:-1,_betweenTransaction:0,_maxHistoryCount:200,_disabled:!1,ignoredPropertyMap:{imageLoaded:!0,children:!0,attaches:!0,shape:!0,childChange:!0,agentChange:!0,sourceAgent:!0,targetAgent:!0,edgeGroup:!0,"*":!0},beginInteraction:function(){this.beginTransaction()},endInteraction:function(){this.endTransaction()},beginTransaction:function(){if(!this._disabled){var X=this;X._betweenTransaction++,1===X._betweenTransaction&&(X._transactionHistories=[])}},endTransaction:function(){if(!this._disabled){var l=this,m=l._histories;l._betweenTransaction>0&&l._betweenTransaction--,0===l._betweenTransaction&&(l._transactionHistories&&l._transactionHistories.length&&(m=m.slice(0,l._historyIndex+1),m.push(l._transactionHistories),m.length>l._maxHistoryCount&&(m=m.slice(m.length-l._maxHistoryCount)),l.setHistories(m),l.setHistoryIndex(m.length-1,!0)),delete l._transactionHistories)}},setDataModel:function(z){var U=this,N=U._dataModel;N!==z&&(N&&(delete N._historyManager,N.ump(U.handleDataModelPropertyChange,U),N.umm(U.$5p,U),N.umd(U.$6p,U),N.removeHierarchyChangeListener(U.handleHierarchyChange,U),N.removeIndexChangeListener(U.handleIndexChange,U)),U._dataModel=z,z&&(z._historyManager=U,z.mp(U.handleDataModelPropertyChange,U),z.mm(U.$5p,U),z.md(U.$6p,U),z.addHierarchyChangeListener(U.handleHierarchyChange,U),z.addIndexChangeListener(U.handleIndexChange,U)),U.fp("dataModel",N,z),U.clear())},setHistoryIndex:function(N,x){var p=this,l=p._historyIndex,C=p._histories.length;if(-1>N?N=-1:N>=C&&(N=C-1),l!==N){if(!x){var O=N-l;O>0?p.$2p(O):0>O&&p.$1p(-O)}p._historyIndex=N,p.fp("historyIndex",l,N),p.dataModel&&p.dataModel.onHistoryManagerChanged()}},setMaxHistoryCount:function(O){var $=this,u=$._histories,W=$._maxHistoryCount;(!O||0>=O)&&(O=10),W!==O&&($._maxHistoryCount=O,$.fp("maxHistoryCount",W,O),u.length>O&&$.clear())},cloneValue:function(Y){return M.Default.clone(Y)},isPropertyUndoable:function(q){return q&&!this.ignoredPropertyMap[q]},$5p:function(O){this.handleChange(O,O.kind)},$6p:function(t){this.handleChange(t,"property")},handleHierarchyChange:function($){this.handleChange($,"hierarchy")},handleIndexChange:function(P){this.handleChange(P,"index")},handleDataModelPropertyChange:function(t){this.handleChange(t,"dataModelProperty")},toChildrenInfo:function(l){var b={};return b.data=l,b.children=[],l.eachChild(function(k){b.children.push(this.toChildrenInfo(k))},this),b},restoreChildren:function(d){var K=d.data;d.children.forEach(function(e){var r=e.data;r.getParent()!==K&&K.addChild(r),this._dataModel.contains(r)||this._dataModel.add(r),this.restoreChildren(e)},this)},handleChange:function(l,e){var N=this;if(!(N._disabled||N._isUndoRedoing||y.loadingRefGraph)){var P,c=(N._histories,l.data),j=l.property;if(!c||!(c._refGraph||c instanceof M.RefGraph)){if("property"===e)N.isPropertyUndoable(j,c)&&(P={kind:e,data:c,property:j,oldValue:N.cloneValue(l.oldValue,c,j),newValue:N.cloneValue(l.newValue,c,j),event:l});else if("hierarchy"===e||"index"===e)P={kind:e,data:c,oldIndex:l.oldIndex,newIndex:l.newIndex,event:l};else if("clear"===e)P={kind:e,json:l.json,event:l};else if("add"===e){if(P={kind:e,data:c,event:l,childrenInfo:this.toChildrenInfo(c),parent:c.getParent()},P.parent){var o=N._dataModel.getSiblings(c);P.siblingsIndex=o.indexOf(c)}c instanceof M.Node&&(P.host=c.getHost(),P.attaches=c.getAttaches()?c.getAttaches().toArray():i),c instanceof M.Edge&&(P.source=c.getSource(),P.target=c.getTarget())}else"remove"===e?P={kind:e,data:c,event:l}:"dataModelProperty"===e&&(P={kind:e,property:j,oldValue:N.cloneValue(l.oldValue,c,j),newValue:N.cloneValue(l.newValue,c,j),event:l});N.addHistory(P)}}},addHistory:function(F){var R=this;if(F)if(R._betweenTransaction){var n=!1;if("property"===F.kind||"dataModelProperty"===F.kind)for(var O=R._transactionHistories.length-1;O>=0;O--){var D=R._transactionHistories[O];if(F.kind===D.kind&&F.property===D.property&&F.data===D.data){F.oldValue=D.oldValue,R._transactionHistories[O]=F,n=!0;break}}n||R._transactionHistories.push(F)}else{var f=R._histories;f=f.slice(0,R._historyIndex+1),f.push([F]),f.length>R._maxHistoryCount&&(f=f.slice(f.length-R._maxHistoryCount)),R.setHistories(f),R.setHistoryIndex(f.length-1,!0)}},canUndo:function(){return!this._disabled&&this._historyIndex>=0&&this._historyIndex<this._histories.length},canRedo:function(){return!this._disabled&&this._historyIndex>=-1&&this._historyIndex<this._histories.length-1},undo:function(J){(!J||0>=J)&&(J=1),this.setHistoryIndex(this._historyIndex-J)},$1p:function(r){if(this.canUndo()){var n,x=this,S=x._dataModel,X=x._histories,J=x._historyIndex;for(x._isUndoRedoing=!0,y.setIsolating(!0);r>0;){if(J>=0&&J<X.length){n=X[J],J--;for(var W=n.length-1;W>=0;W--){var N=n[W],o=N.kind,f=N.data,U=N.property,b=N.event,t=this.cloneValue(N.oldValue,f,U);if(N.undo)N.undo();else if("add"===o)S.remove(f,{keepChildren:!0});else if("remove"===o)S.contains(f)||S.add(f,b.rootsIndex,b.datasIndex);else if("clear"===o)S.deserialize(y.clone(N.json));else if("property"===o)if("parent"===U)t?t.addChild(f,b.oldIndex):(f.setParent(t),b.oldIndex>=0&&S.moveTo(f,b.oldIndex));else{var l=null;0===U.indexOf("a:")?(l="attr",U=U.replace("a:","")):0===U.indexOf("s:")&&(l="style",U=U.replace("s:","")),Y.setPropertyValue(f,l,U,t)}else if("dataModelProperty"===o){var l=null;0===U.indexOf("a:")?(l="attr",U=U.replace("a:","")):0===U.indexOf("s:")&&(l="style",U=U.replace("s:","")),Y.setPropertyValue(S,l,U,t)}else"hierarchy"===o?S.moveTo(f,N.oldIndex):"index"===o&&S.moveToIndex(f,N.oldIndex)}}r--}y.setIsolating(!1),delete x._isUndoRedoing}},redo:function(L){(!L||0>=L)&&(L=1),this.setHistoryIndex(this._historyIndex+L)},$2p:function(p){if(this.canRedo()){var a,s=this,$=s._dataModel,V=s._histories,E=s._historyIndex;for(s._isUndoRedoing=!0,y.setIsolating(!0);p>0;){if(E>=-1&&E<V.length-1){E++,a=V[E];for(var A=0;A<a.length;A++){var T=a[A],r=T.kind,G=T.data,q=T.property,d=T.event,c=this.cloneValue(T.newValue,G,q);if(T.redo)T.redo();else if("add"===r)T.parent&&!G.getParent()&&T.parent.addChild(G,T.siblingsIndex),$.contains(G)||$.add(G,d.rootsIndex,d.datasIndex),this.restoreChildren(T.childrenInfo),G instanceof M.Node&&(G.setHost(T.host),T.attaches&&T.attaches.forEach(function(C){C.setHost(G)})),G instanceof M.Edge&&(G.setSource(T.source),G.setTarget(T.target));else if("remove"===r)$.remove(G);else if("clear"===r)$.clear();else if("property"===r)if("parent"===q)c?c.addChild(G,d.newIndex):(G.setParent(c),d.newIndex>=0&&$.moveTo(G,d.newIndex));else{var L=null;0===q.indexOf("a:")?(L="attr",q=q.replace("a:","")):0===q.indexOf("s:")&&(L="style",q=q.replace("s:","")),Y.setPropertyValue(G,L,q,c)}else if("dataModelProperty"===r){var L=null;0===q.indexOf("a:")?(L="attr",q=q.replace("a:","")):0===q.indexOf("s:")&&(L="style",q=q.replace("s:","")),Y.setPropertyValue($,L,q,c)}else"hierarchy"===r?$.moveTo(G,T.newIndex):"index"===r&&$.moveToIndex(G,T.newIndex)}}p--}y.setIsolating(!1),delete s._isUndoRedoing}},clear:function(){this.setHistories([]),this.setHistoryIndex(-1,!0),this._betweenTransaction=0,delete this._transactionHistories}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);