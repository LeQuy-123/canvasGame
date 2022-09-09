function drawStatusText(ctx, input, state) {
    ctx.font = '30px Helvetica';
    ctx.fillText('Last input: ' + input.lastKey, 10, 30);
    ctx.fillText('Activti state: ' + state, 10, 60);

}

export {
    drawStatusText
}