/*
 *  BSD License (http://lemurproject.org/galago-license)
 */
package org.lemurproject.galago.core.index.geometric;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.lemurproject.galago.core.retrieval.iterator.CountIterator;
import org.lemurproject.galago.core.retrieval.iterator.BaseIterator;
import org.lemurproject.galago.core.retrieval.processing.ScoringContext;
import org.lemurproject.galago.core.retrieval.query.AnnotatedNode;

/**
 *
 * @author sjh
 */
public class DisjointCountsIterator extends DisjointIndexesIterator implements CountIterator {

  public DisjointCountsIterator(Collection<CountIterator> iterators) {
    super((Collection) iterators);
  }

  @Override
  public int count(ScoringContext c) {
    return ((CountIterator) head).count(c);
  }

  @Override
  public AnnotatedNode getAnnotatedNode(ScoringContext c) throws IOException {
    String type = "counts";
    String className = this.getClass().getSimpleName();
    long document = currentCandidate();
    boolean atCandidate = hasMatch(c.document);
    String returnValue = Integer.toString(count(c));
    List<AnnotatedNode> children = new ArrayList<AnnotatedNode>();
    for (BaseIterator child : this.allIterators) {
      children.add(child.getAnnotatedNode(c));
    }

    return new AnnotatedNode(type, className, this.toString(), document, atCandidate, returnValue, children);
  }
}
