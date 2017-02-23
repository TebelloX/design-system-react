import React from 'react';

/**
 * Traverse all children
 */
function flatMapChildren (children, f) {
	const result = [];
	function go (xs, f) {
		return React.Children.map(xs, (c) => {
			result.push(f(c));
			if (c.type) go(c.props.children, f);
		});
	}
	go(children, f);
	return result;
}

/**
 * Perhaps there's a more pragmatic way to do this. Eventually, I suspect we'll have some utils to help find children.
 */
function hasChild (children, name) {
	let flag = false;
	flatMapChildren(children, (c) => {
		flag = flag || (c.type && c.type.name === name);
	});
	return flag;
}

// findDOMNode complains so filter out strings from virtual dom
function textContent (children) {
	return flatMapChildren(children, (c) => {
		if (typeof c === 'string') return c;
	}).join(' ');
}

export default { textContent, hasChild };
