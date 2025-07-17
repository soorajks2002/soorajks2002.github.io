# Profile Photo Setup

To add your profile photo to the homepage:

1. **Add your photo** to this directory as `profile.jpg`
2. **Recommended specifications:**
   - **Dimensions**: 300x300px (square)
   - **Format**: JPG or PNG
   - **File size**: Under 500KB for fast loading
   - **Style**: Professional headshot or casual portrait

3. **Update the HTML**: In `index.html`, uncomment this line:
   ```html
   <img src="assets/images/profile.jpg" alt="Sooraj Kumar S" />
   ```

4. **Remove the placeholder**: Delete or comment out the placeholder div:
   ```html
   <div class="photo-placeholder">
       Add your photo to<br/>
       <code>assets/images/profile.jpg</code>
   </div>
   ```

The photo will automatically be styled with rounded corners and proper sizing to match the design. 