import {$} from 'zepto-browserify';
import {basic, post, cors} from './basic';
import {stream} from './stream';

$('#basic').click(basic);
$('#post').click(post);
$('#cors').click(cors);
$('#stream').click(stream);
