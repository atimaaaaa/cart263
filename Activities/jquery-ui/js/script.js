$(`#escape-tunnel`).hide();

$(`#introduction-dialog`).dialog({
  modal: true,
  buttons: {
    Imagination: function() {
      $(this).dialog(`close`);
    },
    "Escape tunnel": function() {
      $(`#escape-tunnel`).show();
      $(this).dialog(`close`);
    }
  }
});

$(`#prisoner`).draggable({
  containment: "#prison",
  start: function() {
    $(this).addClass(`prisoner-dragging`, 700);
  },
  stop: function() {
    $(this).removeClass(`prisoner-dragging`, 700);
  }
});

$("#escape-tunnel").droppable({
  drop: function(event, ui) {
    ui.draggable.remove();
  }
});
