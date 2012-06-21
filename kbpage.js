kbp = {
    // Prepare keybearer
    init: function(wordlistURL, badngramlistURL) {
        keybearer.loadWordlist(wordlistURL, '_wordlist', kbp.bind_input);
        keybearer.loadWordlist(badngramlistURL, '_badngramlist', kbp.bind_input);
    },

    // Bind input change events
    bind_input: function() {
      $('#num_pass').change(kbp.generateAllFriendKeys);
      $('#num_pass').change(kbp.checkUnlockKeys);
      $('#pass_len').change(kbp.generateAllFriendKeys);
      $('#num_pass').change();
    },

    // Event handler for changing number of friends
    generateAllFriendKeys: function() {
        var gk = $('#generated_pass');
        gk.empty();
        var n_keys = $('#num_pass option:selected').val();
        for(var i = 0; i < n_keys; i++){
          gk.append(kbp.mkFriendKey(i, keybearer.makePassword($('#pass_len').val())));
          $('#reset_pass' + i).click(function(ev) {
            $('#' + ev.currentTarget.id.replace('reset_', '')).
              val(keybearer.makePassword($('#pass_len').val()));
        });
      }
    },

    // Ensure more friends aren't needed to unlock than exist
    checkUnlockKeys: function (){
        var max_sel = $('#num_pass option:selected').val();
        var sel = Math.min(max_sel,
                           $('#num_unlock_pass option:selected').val());
        // always rebuild the list. simple special cases could avoid this
        var nuk = $('#num_unlock_pass');
        nuk.find('option').remove();
        for(var i = 1; i <= max_sel; i++){
            nuk.append('<option value=I>I</option>'.
                    replace('=I', '=I' + (i == sel ? ' selected' : '')).
                    replace(/I/g, i));
        }
    },

    // Friend form template
    ffTemplate: '\
      <div class="pass"> \
        <button id="reset_passX">Regenerate</button> \
        <input type="text" class="password" id="passX" value="PASSWORD" /> \
      </div>',

    // Fill in form template
    mkFriendKey: function(friendID, password){
        return kbp.ffTemplate.replace(/passX/g, 'pass' + friendID).
            replace('PASSWORD', password);
    }
}
