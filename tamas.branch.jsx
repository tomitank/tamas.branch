import { useState, useEffect } from 'react';
import '../css/tamas.branch.css';
import $ from 'jquery';

export default ({columns}) => {
    const [activeLeaf, setActiveLeaf] = useState('0-0');

    return (
        <div className='tamas-branch-wrapper'>
            {
                columns.map((column, columnIndex) =>
                    <div className='tamas-branch-column'>
                        {
                            column.leafs.map((leaf, leafIndex) => {
                                let leafId = columnIndex+'-'+leafIndex;
                                let joinToRight =
                                !leaf.dontJointToRight
                                && columns[columnIndex+1]?.leafs?.length >= (leafIndex + 1); // has horizontal pair..?

                                return (
                                    <div
                                        className={
                                            'tamas-branch-leaf'
                                            +(leafIndex > 0 ? ' has-top-leaf' : '')
                                            +(joinToRight ? ' has-right-leaf' : '')
                                        }
                                    >
                                        <div className='tamas-branch-name'>
                                            {leaf.name || <div>&nbsp;</div>}
                                        </div>
                                        <div
                                            className={
                                                'tamas-branch-icon'
                                                +(leaf.color ? ' '+leaf.color : '')
                                                +(leafId == activeLeaf ? ' active-leaf' : '')
                                            }
                                            onClick={
                                                (e) => {
                                                    setActiveLeaf(columnIndex+'-'+leafIndex);
                                                    if (typeof leaf.onClick === 'function') {
                                                        leaf.onClick(e);
                                                    }
                                                }
                                            }
                                            onMouseEnter={
                                                leaf.tooltip ? (e)=> {
                                                    let icon = e.target;
                                                    if ($(icon).hasClass('tamas-branch-icon') == false) { // children..
                                                        icon = $(icon).closest('.tamas-branch-icon');
                                                    }
                                                    $(icon).showTooltip(leaf.tooltip)
                                                } : null
                                            }
                                        >
                                            {leaf.icon}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
};
