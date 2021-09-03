
var canvas = new fabric.Canvas('canvas', {
    width: 1200,
    height: 600,

})

// fabric.Image.fromURL('https://i.pinimg.com/originals/ca/50/e8/ca50e8482d4faf65dd06c8f11d9cd332.jpg', (
//     img) => {
//         canvas.backgroundImage = img;
//         canvas.renderAll()
//     })

// canvas.on('mouse:move', (e) => {
//     console.log(e);
// })

// canvas.renderAll();


var mods = {
    pointer: 'pointer',
    pencil: 'pen',
    text: 'text',
    note: 'note',
    eraser: 'eraser'
}

var activeMod = mods.pointer;

$('.tool').on('classchange', function () {
    if ($('#pencil').hasClass('active'))
        canvas.isDrawingMode = true;
    else
        canvas.isDrawingMode = false;
    if ($('#text').hasClass('active') || $('#todo').hasClass('active'))
        canvas.selection = false;
    else
        canvas.selection = true;
})

$('#pointer').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active').trigger('classchange');
    activeMod = mods.pointer;
})

$('#pencil').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active').trigger('classchange');
    activeMod = mods.pencil;
})

$('#text').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active').trigger('classchange');
    activeMod = mods.text;
})

$('#todo').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active').trigger('classchange');
    activeMod = mods.note;
})

$('#eraser').click(function () {
    $('.tool').removeClass('active');
    $(this).addClass('active').trigger('classchange');
    activeMod = mods.eraser;
})

canvas.on('mouse:up', function (e) {
    coords = canvas.getPointer(e, true)
    if (activeMod == mods.text && canvas.getActiveObject() == undefined) {
        text = new fabric.IText('Example', {
            left: coords.x,
            top: coords.y,
            fontSize: 20
        });
        canvas.add(text)
    }
})
canvas.on('mouse:up', function (e) {
    coords = canvas.getPointer(e, true)
    if (activeMod == mods.note && canvas.getActiveObject() == undefined) {
        var note = new fabric.Textbox('TODO ITEM', {
            fontSize: 16,
            width: 150,
            height: 200,
            padding: 5,
            backgroundColor: '#8e00ff',
            left: coords.x,
            top: coords.y,
            lockScalingY: true
        });
        canvas.add(note);
    }
})
canvas.on('mouse:down', function () {
    switch (activeMod) {
        case mods.note: {
            break;
        }
        case mods.eraser: {
            if (canvas.getActiveObjects()) {
                canvas.getActiveObjects().forEach(function (el, i, arr) {
                    canvas.remove(el);
                })
            }
            break;
        }
    }
})
