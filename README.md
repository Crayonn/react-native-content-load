# React Native Content Load

## Example

<p align="center">
  <img src="https://github.com/crayonn/react-native-content-load/raw/master/screen/screen.gif" width=375 height=688>
<br>

## install

1. yarn add react-native-linear-gradient react-native-content-load

  or

  npm install react-native-linear-gradient react-native-content-load

2. react-native link react-native-linear-gradient

## Use

```
import LoadWarpper from 'react-native-content-load';

<LoadWarpper>
  {Component}
</LoadWarpper>
```

## Props

  <table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>color</td>
          <td>Object</td>
          <td>{first:['#CCC', '#F1F1F1', '#CCC'],second:['#F1F1F1', '#CCC', '#CCC']}</td>
          <td>isRequired</td>
        </tr>
         <tr>
          <td>startX</td>
          <td>number || array</td>
          <td>0</td>
          <td>number -> no animation; array -> animation with startX</td>
        </tr>
         <tr>
          <td>startY</td>
          <td>number || array</td>
          <td>0.4</td>
          <td>number -> no animation; array -> animation with startY</td>
        </tr>
         <tr>
          <td>endX</td>
          <td>number || array</td>
          <td>1</td>
          <td>number -> no animation; array -> animation with endX</td>
        </tr>
         <tr>
          <td>endY</td>
          <td>number || array</td>
          <td>0.6</td>
          <td>number -> no animation; array -> animation with endY</td>
        </tr>
          <tr>
          <td>isLoop</td>
          <td>boolean</td>
          <td>true</td>
          <td></td>
        </tr>
          <tr>
          <td>speed</td>
          <td>number</td>
          <td>3000</td>
          <td></td>
        </tr>
    </tbody>
</table>


## License

MIT
