import React, { useMemo, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { getNodesAndLinks } from '../../services';

const TextNodeGraph = () => {
    const graphData = useMemo(() => getNodesAndLinks(), []);
    const fg2dRef = useRef();

    return (
        <ForceGraph2D
          ref={fg2dRef}
          graphData={graphData}
          nodeAutoColorBy="group"
          linkAutoColorBy="group"
          cooldownTicks={100}
          onEngineStop={() => fg2dRef.current.zoomToFit(400)}
          linkWidth={1}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.color;
            ctx.fillText(label, node.x, node.y);
            console.log(node.color)
            node.__bckgDimensions = bckgDimensions;
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          }}
        />
    )   
}

export default TextNodeGraph;