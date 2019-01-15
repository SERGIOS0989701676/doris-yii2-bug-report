# Установка и настройка
<code>composer require doris/yii2-bug-report "*"</code>

В параметраы <code>frontend/config/params</code> необходимо положить следующие настройки:<br>
<pre>
'bugReport' => [
    'apiKey' => "Хэш для доступа к админке",
    'email' => "Емейл пользователя от имени которого будет оставлен комментарий",
    'pageUrl' => "Ссылка на задачу (без домена, начиная с project. К примеру '/project/51000/7532817/')",
    'imagePath'=>'Путь к дериктории куда будет сохранена картинка (относительно @webroot)'
]
</pre>

Так же в файле <code>frontend/config/main</code> необходимо подключить модуль:
<pre>
'bootstrap' => ['bugReport'],
'modules' => [
	'bugReport' => 'doris\bugReport\module\Handler',
],
</pre>

В лаяуте необходимо подключить виджет, он же и будет выводить на страницу необзодимую
форму, попап, скрипты, стили и т.д:<br>

<pre>
use doris\bugReport\widgets\bugReportWidget\BugReportWidget;

BugReportWidget::widget();
</pre>

# Использование
После подключение в верхнем углу экрана появится иконка фотоапарата, что бы составить и отправить отчет можно:
<ol>
<li>Нажать на иконку фотоапарата</li>
<li>Нажать комбинацию клавиш <code>W + E + R</code></li>
</ol>
<br>
После иконка фотоапарата сменится на лоадер. Спустя какое-то время появится попап окно с скришотом
страницы. На сткриншоте можно сделать пометку. Внизу будет текстареа где можно описать ошибку.
Для закрытия попап-окна можно либо кликнуть на затемненную область, либо нажать <code>Esc</code>.